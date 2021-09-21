/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// self.addEventListener('notificationclose', (e) => {
//   console.log(`notification close`, e);
// });
// listen for a notification click
self.addEventListener('notificationclick', (e) => {
  // if the action is "latest" then we want to show them the latest deals on our icecream truck page.
  switch (e.action) {
    case 'latest':
      clients.openWindow(`/icecream-truck`);
      break;
    case 'close':
      // TODO Make sure this is done
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
