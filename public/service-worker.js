/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// listen for a notification click
self.addEventListener('notificationclick', (e) => {
  // if the action is "latest" then we want to show them the latest deals on our icecream truck page.
  switch (e.action) {
    case 'latest':
      console.log(
        `The user selected to view our icecream truck deal from the notification.`
      );
      clients.openWindow(`/icecream-truck`);
      break;
    case 'accept':
      console.log(
        `User accepted the notification and are on their way to pickup their order!`
      );
      e.notification.close();
      break;
    case 'close':
      console.log(`The user dismissed the notification.`);
      e.notification.close();
      break;
    default:
  }
});

// listen for a push event from the server
self.addEventListener('push', (e) => {
  const data = e.data.text();
  const options = JSON.parse(data);
  const { title, ...otherOptions } = options;

  e.waitUntil(self.registration.showNotification(title, { ...otherOptions }));
});
