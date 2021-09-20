require('dotenv').config({ path: '.env.local' });
const webpush = require('web-push');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const subscribedUsersOnTheServer = new Map();
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

// TODO: Delete and pass Arg
const sampleMsg = {
  body: `Test Notification`,
  icon: `favicon.png`,
  actions: [
    { action: 'accept', title: "I'm coming!" },
    { action: 'decline', title: 'Forget it' },
  ],
};

const notify = (subscribers) => {
  console.log({ subscribers });
  if (subscribers.size < 1) {
    console.log('No subscribers to notify...');
    return;
  }

  subscribers.forEach((subscriber) => {
    console.log({ subscriber });
    webpush
      .sendNotification(subscriber, JSON.stringify(sampleMsg), options)
      .then(() => console.log(`${subscribers.size} subscribers notified.`))
      .catch((error) => console.error('Error in pushing notification', error));
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
});
