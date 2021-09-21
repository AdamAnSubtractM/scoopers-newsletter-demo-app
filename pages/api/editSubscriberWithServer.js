export default function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const { id, subscribedUsersOnTheServer, msgDetails } = body;
    console.log({ body });
    res.status(200).json({
      id,
      subscribedUsersOnTheServer: subscribedUsersOnTheServer.size,
      msgDetails,
    });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you using the correct method.' });
  }
}
