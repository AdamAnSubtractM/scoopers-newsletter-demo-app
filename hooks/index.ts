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
  const [isSubscribed, setIsSubscribed] = useState(undefined);
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
  const subscribeUserWithServer = (subscription) =>
    fetch(`/api/addSubscriberToServer`, {
      method: `POST`,
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': `application/json`,
      },
    });

  // unsubscribe a user with the server for notifications
  const unsubscribeUserWithServer = (id) =>
    fetch(`/api/removeSubscriberFromServer`, {
      method: `POST`,
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': `application/json`,
      },
    });

  const notifySubscribedUsers = (subscribers) =>
    fetch(`/api/notifySubscribedUsers`, {
      method: `POST`,
      body: JSON.stringify({ subscribers }),
      headers: {
        'Content-Type': `application/json`,
      },
    });

  // subscribe the user with the service worker and then also on the server
  const subscribeUser = () => {
    const appServerPubKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    console.log({ appServerPubKey });
    const parsedKeyAsArray = urlB64ToUint8Array(appServerPubKey);
    serviceWorkerObjRef.current.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: parsedKeyAsArray,
      })
      .then(async (subscription) => {
        await subscribeUserWithServer(subscription);
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
          const subAsString = JSON.stringify(subscription);
          const subAsObj = JSON.parse(subAsString);
          unsubscribeUserWithServer(subAsObj.keys.auth);
          return subscription.unsubscribe();
        }
      })
      .catch((err) => {
        console.error(`Failed to unsubscribe from Push Service.`, err);
      });
  };

  // const notifySubscribedUsers = (subscribers, message, options) => {
  //   if (subscribers.size < 1) {
  //     console.log(`No Subscribers to notify.`, { subscribers });
  //     return;
  //   }

  //   subscribers.forEach((subscriber) => {
  //     webpush
  //       .sendNotification(subscriber, message, options)
  //       .then(() => console.log(`${subscriber.size} subscribers notified.`))
  //       .catch((err) => console.error(`Error pushing notification`, error));
  //   });
  // };

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
            setIsSubscribed(activeSubscription);
          });
      })
      .then(async () => {
        const notificationStatus = await requestNotificationPermissions();
        setIsNotificationStatus(notificationStatus);
      })
      .catch((err) => console.error(err));
  }, []);

  // rerun the code each time the user subscribes/unsubscribes
  useEffect(() => {
    console.log({ isSubscribed });
    if (isSubscribed) {
      subscribeUser();
    } else if (isSubscribed !== undefined) {
      unsubscribeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscribed]);

  return {
    isNotificationStatus,
    isSubscribed,
    setIsSubscribed,
    notifySubscribedUsers,
  };
};
