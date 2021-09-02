
self.addEventListener('notificationclick', event => {
    if (event.action === 'decline') {
        clients.openWindow('http://localhost:9999/decline.html');
    } else if (event.action === 'accept') {
        clients.openWindow('http://localhost:9999/accept.html');
    }

    //self.registration.getNotifications()
    //    .then(ns => ns.forEach(n => n.close()))

})

self.addEventListener('push', event => {
    const data = event.data.text();
    const options = JSON.parse(data);

    event.waitUntil(
        self.registration.showNotification("Your Order is ready!", options)
    )
})