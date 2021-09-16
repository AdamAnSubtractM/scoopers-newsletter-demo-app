import { subscribedUsersOnTheServer } from '../../helpers';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const pushSubsription = req.body;
    const id = pushSubsription?.keys?.auth || null;
    if (id) {
      subscribedUsersOnTheServer.set(id, pushSubsription);
      console.log({ subscribedUsersOnTheServer });
      console.log(
        `New subscriber added. Total Subscribers: ${subscribedUsersOnTheServer.size}`
      );
    }
    res.status(200).json({ id });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you have the correct method.' });
  }
}
