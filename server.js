/* eslint-disable no-console */
require('dotenv').config({ path: '.env.local' });
const webpush = require('web-push');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const subscribedUsersOnTheServer = new Map();
const notificationQueue = new Map();
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

const options = {
  TTL: 60,
  vapidDetails: {
    subject: 'mailto: pushers@pushy.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey,
  },
};

const notify = (subscribers) => {
  // console.log(
  //   `Number of subscribed users on the server: ${subscribedUsersOnTheServer.size}.`
  // );
  // console.log(
  //   `Number of subscribed users who need notified: ${subscribers.size}`
  // );
  if (subscribers.size < 1) {
    // console.log('No subscribers currently need notified.');
    return;
  }

  subscribers.forEach((subscriber, idx) => {
    const { msgDetails, ...subscriberDetails } = subscriber;
    const { keys } = subscriberDetails;
    if (!msgDetails) {
      // console.log(
      //   `Subscriber ${idx + 1} of ${
      //     subscribers.size
      //   } is subscribed to updates but doesn't have any queued messages.`
      // );
      return;
    }
    if (!subscriberDetails) return;
    // use the webpush library to send notification by passing in the subscribe, notification details, and options which include the VAPID Keys
    webpush
      .sendNotification(subscriber, JSON.stringify(msgDetails), options)
      .then(() => {
        // console.log(
        //   `Notification should have been sent.`,
        //   JSON.stringify(subscriber)
        // );
        notificationQueue.delete(keys.auth);
      })
      .catch((error) =>
        console.error(`Error in managing the user's notification`, error)
      );
  });
};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.all('*', (req, res) => {
    const { url, body } = req;
    switch (url) {
      case '/api/addSubscriberToServer': {
        const { pushSubscription } = body;
        const id = pushSubscription?.keys?.auth || null;
        subscribedUsersOnTheServer.set(id, pushSubscription);
        body.subscribedUsersOnTheServer = subscribedUsersOnTheServer;
        return handle(req, res);
      }
      case '/api/removeSubscriberFromServer': {
        const { id } = body;
        subscribedUsersOnTheServer.delete(id);
        notificationQueue.delete(id);
        body.subscribedUsersOnTheServer = subscribedUsersOnTheServer;
        return handle(req, res);
      }
      case '/api/addSubscriberToNotificationQueue': {
        const { pushSubscription, msgDetails } = body;
        const id = pushSubscription?.keys?.auth || null;
        notificationQueue.set(id, { ...pushSubscription, msgDetails });
        body.subscribedUsersOnTheServer = subscribedUsersOnTheServer;
        return handle(req, res);
      }
      case '/api/notifySubscribedUsers': {
        notify(subscribedUsersOnTheServer);
        return handle(req, res);
      }
      default:
        return handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  setInterval(() => {
    notify(notificationQueue);
  }, 30000);
});
