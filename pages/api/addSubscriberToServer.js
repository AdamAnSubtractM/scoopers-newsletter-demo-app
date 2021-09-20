export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { pushSubscription, subscribedUsersOnTheServer } = body;
    const id = pushSubscription?.keys?.auth || null;
    res.status(200).json({
      id,
      pushSubscription,
      subscribedUsersOnTheServer: subscribedUsersOnTheServer.size,
    });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you have the correct method.' });
  }
}
