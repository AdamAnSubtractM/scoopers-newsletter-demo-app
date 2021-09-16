# Scoopers' Newsletter

This app is intended to be a demo app that is used to demonstrate different features of a PWA. With this first round of commits, we will be demostration push notifications. The idea is that we will expand on this app and keep adding more and more PWA features.

## Live Version

[https://scoopers-newsletter-demo-app.vercel.app/](https://scoopers-newsletter-demo-app.vercel.app/)

* The GitHub admins have locked us down from being able to add integrations like Vercel for deployment. The workaround was to host this repo on my personal GitHub and hook up Vercel to that repository. The downside is that now I have to push to two repos to keep them in sync.

## Prerequisites

### Install latest node

This project requires the LTS version of Node. If you have another version installed, you can best manage them using Node Version Manager (nvm) or n. This is well documented in confluence.

Read [Installing NodeJS and managing multiple versions.](https://anixter.atlassian.net/wiki/spaces/NEW/pages/2745466916/Installing+NodeJS+and+managing+multiple+versions.)

### Getting the project locally

```sh
git clone https://github.com/AdamAnSubtractM/scoopers-newsletter-demo-app

cd scoopers-newsletter-demo-app
```

### Installing dependencies

The dependency for entire project can be downloaded using the following command

```sh
npm i
```

### Generate a vapid public/private key pair. This is important for the app to work locally

* In the root directory of this project run `./node_modules/.bin/web-push generate-vapid-keys`
* Copy these keys to a safe place as we will need them in the following steps
* Copy the `sampleenv.local` file and rename it to `.env.local`. This is ignored by git for security reasons
* Update `VAPID_PUBLIC_KEY` to have a value of the public key we generated in the previous steps
* Update `VAPID_PRIVATE_KEY` to have a value of the private key we generated in the previous steps

### Start the App

Once installed, you can start the app with the following command

```sh
npm start
```

This will start the app at [localhost:3000](http://localhost:3000).

### References

Use [Notification Generator](https://serviceworke.rs/push-get-payload_demo.html) demo to test the client notification subscription workflow  

[Customize the Notification `options` object](https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification#Syntax)

[API documentation of `Clients` interface](https://developer.mozilla.org/en-US/docs/Web/API/Clients)

[API documentation for `clients.openWindow`](https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow)

[API documentation on `clients.matchAll`](https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll)

[API documentation for `PushManager.subscribe`](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)

[API documentation of Service Worker `getNotifications`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/getNotifications)

[API documentation of Service Worker `showNotifications`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)  

[API documentation of `ServiceWorkerRegistration`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)  

[API Reference for `webPush.sendNotification`](https://github.com/web-push-libs/web-push#api-reference)

[Usage Example for FakerJS `helpers.createTransaction`](https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#helpers)  

[W3 Spec on Service Worker `event.waitUntil`](https://www.w3.org/TR/service-workers/#wait-until-method)  

[W3 Spec on Page Visibility](https://www.w3.org/TR/page-visibility/#dom-document-visibilitystate)  
