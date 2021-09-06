/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// self.addEventListener('notificationclick', (event) => {
//   if (event.action === 'decline') {
//     clients.openWindow('http://localhost:3000/declined');
//   } else if (event.action === 'accept') {
//     clients.openWindow('http://localhost:3000/accepted');
//   }
// });

// self.addEventListener('push', (event) => {
//   const data = event.data.text();
//   const options = JSON.parse(data);

//   event.waitUntil(
//     self.registration.showNotification('Your Order is ready!', options)
//   );
// });

// self.addEventListener('notificationclose', (e) => {
//   console.log(`notification close`, e);
// });

self.addEventListener('notificationclick', (e) => {
  if (e.action === 'icecream-truck') {
    clients.openWindow(`/${e.action}`);
  }
});
