/* eslint-disable no-console */
// is the code running on the client side
export const isClient = typeof window !== 'undefined';

// check if notifications are supported
export const isNotificationsSupported = () => {
  const supported = `Sweet! The browser suports notifications.`;
  const unsupported = `The browser doesn't support notifications.`;

  if (isClient && !('Notification' in window)) {
    return Promise.reject(console.error(unsupported));
  }
  console.log(supported);
  return Promise.resolve(supported);
};

// register the notification service-worker
export const registerNotificationServiceWorker = () => {
  const notificationServiceWorkerFile = `service-worker.js`;
  const notRegistered = `Service worker not registered yet.`;

  if (isClient && !('serviceWorker' in navigator)) {
    return Promise.reject(console.error(notRegistered));
  }

  return navigator.serviceWorker
    .register(notificationServiceWorkerFile)
    .then((registrationData) => {
      console.log(`Service Worker Registered.`);
      return registrationData;
    });
};

// request permission on the client to show notifications
export const requestNotificationPermissions = () => {
  if (!isClient)
    return Promise.reject(
      console.error(
        `Unable to request notification permissions. Not running on the client-side.`
      )
    );
  return Notification.requestPermission((status) => {
    console.log(`Notification Permission Status: ${status}.`);
    return status;
  });
};

// shows a notification
export const showNotification = (title, options) => {
  if (!isClient)
    return Promise.reject(
      console.error(
        `Unable to show notification. Not running on the client-side.`
      )
    );
  navigator.serviceWorker
    .getRegistration()
    .then((registration) => registration.showNotification(title, options));
};

// TODO verify if this is the best way to do this?
export const subscribedUsersOnTheServer = new Map();
