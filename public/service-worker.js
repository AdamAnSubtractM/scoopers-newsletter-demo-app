/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// self.addEventListener('notificationclick', (event) => {
//   if (event.action === 'decline') {
//     clients.openWindow('http://localhost:3000/declined');
//   } else if (event.action === 'accept') {
//     clients.openWindow('http://localhost:3000/accepted');
//   }
// });

// self.addEventListener('notificationclose', (e) => {
//   console.log(`notification close`, e);
// });
// listen for a notification click
self.addEventListener('notificationclick', (e) => {
  if (e.action === 'icecream-truck') {
    clients.openWindow(`/${e.action}`);
  }
});
// listen for a push event from the server
self.addEventListener('push', (e) => {
  const data = e.data.text();
  const options = JSON.parse(data);

  e.waitUntil(self.registration.showNotification('Server Push !!!', options));
});
