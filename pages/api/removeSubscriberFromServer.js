import { subscribedUsersOnTheServer } from '../../helpers';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const pushSubsription = req.body;
    console.log({ pushSubsription });
    const { id } = pushSubsription;
    subscribedUsersOnTheServer.delete(id);
    console.log(`delete subscriber id`, { id });
    console.log(
      `Subscriber unsubscribed. Total Subscribers: ${subscribedUsersOnTheServer.size}`
    );
    res.status(200).json({ id });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you using the correct method.' });
  }
}
