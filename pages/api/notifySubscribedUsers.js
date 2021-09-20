export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ status: 'Subscribers Notified!' });
  } else {
    res
      .status(400)
      .json({ status: 'Not Found. Make sure you have the correct method.' });
  }
}
