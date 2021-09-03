const client = (() => {

    let serviceWorkerRegObj = undefined;
    let isUserSubscribed = false;

    const serverDomain = 'http://localhost:3000';  //TODO
    const appServerPublicKey = "BDcYnW5jjE7udhOj8D95s1nkRBBGekNvpd1nJGK0x1xiPmgrJabLYty-cKhM19BoAX73QV22X8C3BQcRHhRy7I8";

    const pushButton = document.getElementById("btn-push");
    const orderButtons = document.getElementsByClassName("btn-order");

    const checkNotificationSupport = () => {
        if (!('Notification' in window)) {
            return Promise.reject("The browser doesn't support notifications")
        }
        console.log("The browser supports notifications")
        return Promise.resolve('ok')
    }

    const registerServiceWorker = () => {

        if (!('serviceWorker') in navigator) {
            return Promise.reject("ServiceWorker support is not available")
        }

        return navigator.serviceWorker.register('service-worker.js')
            .then(regObj => {
                serviceWorkerRegObj = regObj;
                console.log("Service Worker registered successfully");

                serviceWorkerRegObj.pushManager.getSubscription()
                    .then(subs => {
                        if (subs) disablePushNotificationButton()
                        else enablePushNotificationButton()
                    })
            })
    }

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Notification permission status: ", status);
        })
    }




    const disablePushNotificationButton = () => {
        isUserSubscribed = true
        pushButton.innerText = "Disable Server Push Notifications"
    }

    const enablePushNotificationButton = () => {
        isUserSubscribed = false
        pushButton.innerText = "Enable Server Push Notifications"
    }




    const setupPush = () => {

        function urlB64ToUint8Array(url) {
            const padding = '='.repeat((4 - url.length % 4) % 4);
            const base64 = (url + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        const placeOrderWithServer = (subscription, flavor) => {
            console.log('Ordering ' + flavor);
            const request = {
                id: subscription,
                flavorName: flavor
            }
            return fetch(serverDomain + '/order', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        const subscribeUser = () => {
            if (isUserSubscribed) {
                console.log('The user is already subscribed to push notifications');
                return Promise.resolve();
            }
            const publicKeyAsArray = urlB64ToUint8Array(appServerPublicKey);

            return serviceWorkerRegObj.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicKeyAsArray
            })
                .then(subscription => {
                    subscribeWithServer(subscription)
                        .then(disablePushNotificationButton());
                    return Promise.resolve();
                })
                .catch(error => {
                    console.error("failed to subscribe to Push Service", error);
                    return Promise.reject();
                });

        }

        const subscribeWithServer = (subscription) => {
            return fetch(serverDomain + '/addSubscriber', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }


        const unsubscribeWithServer = (id) => {
            return fetch(serverDomain + '/removeSubscriber', {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        //part of original training module
        const unsubscribeUser = () => {
            console.log("UN-subscribing user");
            serviceWorkerRegObj.pushManager.getSubscription()
                .then(subscription => {
                    if (subscription) {
                        let subAsString = JSON.stringify(subscription);
                        let subAsObject = JSON.parse(subAsString);
                        unsubscribeWithServer(subAsObject.keys.auth);
                        return subscription.unsubscribe();
                    }
                })
                .then(enablePushNotificationButton)
                .catch(error => console.err("Failed to unsubscribe from Push Service", error))
        }

        //part of original training module
        pushButton.addEventListener('click', () => {
            if (isUserSubscribed) unsubscribeUser();
            else subscribeUser();
        })

        const placeOrder = (event) => {
            const flavorName = event.target.innerText;
            serviceWorkerRegObj.pushManager.getSubscription()
                .then(subscription => {
                    if (subscription) {
                        let subAsString = JSON.stringify(subscription);
                        let subAsObject = JSON.parse(subAsString);
                        placeOrderWithServer(subAsObject.keys.auth, flavorName)
                            .then(showReservationConfirmation(flavorName))
                    } else {
                        console.log('Cannot place an order without a subscription');
                    }
                })
                .catch(error => console.error("Failed to order a pint of ice cream", error))
        }

        //this is a client-side notification
        const showReservationConfirmation = (flavorName) => {

            const customizedNotification = reg => {
                const options = {
                    body: "We'll reserve a Pint of " + flavorName + " for you",
                    icon: "imgs/notification.png",
                }
                reg.showNotification("Got it!", options)
            }

            navigator.serviceWorker.getRegistration()
                .then(registration => customizedNotification(registration))

        }

        //register the user for server push notifications
        subscribeUser();

        //every time the user clicks a flavor, they are reserving a pint of ice cream
        Array.prototype.forEach.call(orderButtons, function (b) {
            b.addEventListener("click", placeOrder)
        });

    }

    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .then(() => {
            if (Notification.permission == "granted") {
                return setupPush();
            }
        })
        .catch(err => console.error(err));




})()