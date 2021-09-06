/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import {
  isNotificationsSupported,
  registerNotificationServiceWorker,
  requestNotificationPermissions,
} from '../helpers';

export const useNotifications = function () {
  // const [isServiceWorkerData, setIsServiceWorkerData] = useState(undefined);
  const [isNotificationStatus, setIsNotificationStatus] = useState(undefined);

  useEffect(() => {
    isNotificationsSupported()
      .then(async () => {
        await registerNotificationServiceWorker();
        // const serviceWorkerData = await registerNotificationServiceWorker();
        // setIsServiceWorkerData({ ...serviceWorkerData });
      })
      .then(async () => {
        const notificationStatus = await requestNotificationPermissions();
        setIsNotificationStatus(notificationStatus);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   console.log(`value should update`, { isServiceWorkerData });
  // }, [isServiceWorkerData]);

  return { isNotificationStatus };
};
