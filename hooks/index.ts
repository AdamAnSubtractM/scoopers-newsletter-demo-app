/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import {
  isNotificationsSupported,
  registerNotificationServiceWorker,
  requestNotificationPermissions,
} from '../helpers';

export const useNotifications = function () {
  const [isNotificationStatus, setIsNotificationStatus] = useState(undefined);
  const [isSubscribed, setIsSubscribed] = useState({
    value: undefined,
    msgDetails: undefined,
  });
  const serviceWorkerObjRef = useRef(undefined);

  // function to convert url token into the format required for secure notifications
  const urlB64ToUint8Array = function (url: string) {
    const padding = '='.repeat((4 - (url.length % 4)) % 4);
    const base64 = (url + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // subscribe a user with the server for notifications
  const subscribeUserWithServer = (subscription, msgDetails) =>
    fetch(`/api/addSubscriberToServer`, {
      method: `POST`,
      body: JSON.stringify({
        pushSubscription: { ...subscription, msgDetails },
      }),
      headers: {
        'Content-Type': `application/json`,
      },
    });

  // unsubscribe a user with the server for notifications
  const unsubscribeUserWithServer = (id, subscription) =>
    fetch(`/api/removeSubscriberFromServer`, {
      method: `POST`,
      body: JSON.stringify({ id, pushSubscription: subscription }),
      headers: {
        'Content-Type': `application/json`,
      },
    });

  // add subscribe user to notification queue
  const addSubscriberToNotificationQueue = (id, subscription, msgDetails) => {
    fetch(`/api/addSubscriberToNotificationQueue`, {
      method: 'POST',
      body: JSON.stringify({ id, pushSubscription: subscription, msgDetails }),
      headers: {
        'Content-Type': `application/json`,
      },
    });
  };

  const notifySubscribedUsers = () =>
    fetch(`/api/notifySubscribedUsers`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
    });

  // subscribe the user with the service worker and then also on the server
  const subscribeUser = (msgDetails) => {
    const appServerPubKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const parsedKeyAsArray = urlB64ToUint8Array(appServerPubKey);
    serviceWorkerObjRef.current.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: parsedKeyAsArray,
      })
      .then(async (subscription) => {
        await subscribeUserWithServer(subscription, msgDetails);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // unsubscribe the user with the service worker and then also on the server
  const unsubscribeUser = () => {
    serviceWorkerObjRef.current.pushManager
      .getSubscription()
      .then((subscription) => {
        if (subscription) {
          const subscriptionStirng = JSON.stringify(subscription);
          const subscriptionObject = JSON.parse(subscriptionStirng);
          const { keys } = subscriptionObject;
          unsubscribeUserWithServer(keys.auth, subscription);
          return subscription.unsubscribe();
        }
      })
      .catch((err) => {
        console.error(`Failed to unsubscribe from Push Service.`, err);
      });
  };

  // once the user is subscribed, we need to flag them to be notified in certain circumstances
  const addToNotificationQueue = (msgDetails) => {
    serviceWorkerObjRef.current.pushManager
      .getSubscription()
      .then((subscription) => {
        if (subscription) {
          const subscriptionStirng = JSON.stringify(subscription);
          const subscriptionObject = JSON.parse(subscriptionStirng);
          const { keys } = subscriptionObject;
          return addSubscriberToNotificationQueue(
            keys.auth,
            subscription,
            msgDetails
          );
        }
      })
      .catch((err) => {
        console.error(`Failed to unsubscribe from Push Service.`, err);
      });
  };

  // when the page loads, see if notifications are supported and then set up the subscription with the service worker and server
  useEffect(() => {
    isNotificationsSupported()
      .then(async () => {
        const registrationData = await registerNotificationServiceWorker();
        serviceWorkerObjRef.current = registrationData;
      })
      .then(() => {
        serviceWorkerObjRef.current.pushManager
          .getSubscription()
          .then((subscribed) => {
            const activeSubscription = Boolean(subscribed);
            setIsSubscribed({ ...isSubscribed, value: activeSubscription });
          });
      })
      .then(async () => {
        const notificationStatus = await requestNotificationPermissions();
        setIsNotificationStatus(notificationStatus);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rerun the code each time the user subscribes/unsubscribes
  useEffect(() => {
    if (isSubscribed.value) {
      console.log(`Is the user currently subscribed?`, isSubscribed.value);
      subscribeUser(isSubscribed.msgDetails);
    } else if (isSubscribed.value !== undefined) {
      console.log(`Is the user currently subscribed?`, isSubscribed.value);
      unsubscribeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed.value]);

  return {
    isNotificationStatus,
    isSubscribed,
    serviceWorkerObjRef,
    setIsSubscribed,
    notifySubscribedUsers,
    addToNotificationQueue,
  };
};
