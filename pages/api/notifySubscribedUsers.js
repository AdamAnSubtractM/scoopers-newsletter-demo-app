import { sendNotification } from 'web-push';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
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
  if (subscribers.size < 1) {
    console.log('No subscribers to notify');
    return;
  }

  subscribers.forEach((subscriber) => {
    sendNotification(subscriber, 'hello', options)
      .then(() => console.log(`${subscribers.size} subscribers notified.`))
      .catch((error) => console.error('Error in pushing notification', error));
  });
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const subscribers = req.body.subscribers || [];
    notify(subscribers);
    res.status(200).json({ status: 'Subscribers Notified!' });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you have the correct method.' });
  }
}
