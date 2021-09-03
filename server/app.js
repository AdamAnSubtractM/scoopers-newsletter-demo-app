const express = require('express')
const cors = require('cors')
const publisher = require('./publisher')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

let orderNumber = 100;

const subscribers = new Map()
const orders = new Map()

app.post('/addSubscriber', function (req, res) {
    const pushSubscription = req.body
    const id = pushSubscription.keys.auth
    subscribers.set(id, pushSubscription)
    console.log('New subscriber added.  Total Subscribers: ' + subscribers.size)
    res.send("Ok")
})

app.post('/removeSubscriber', function (req, res) {
    const id = req.body.id
    subscribers.delete(id)
    console.log('Subscriber unsubscribed. Total Subscribers: ' + subscribers.size)
    res.send("Ok")
})

app.post('/order', function (req, res) {
    const subscriberId = req.body.id
    const flavor = req.body.flavorName
    orders.set(orderNumber++, {subscriberId:subscriberId, flavorName:flavor});
    res.send("Ok")
})

//simulate fulfilling half the orders
const fulfillOrder = () => {
    if (orders.size == 0 || subscribers.size == 0) return;
    let max = orders.size > 2 ? orders.size / 2 : 1;
    console.log('max orders to fill in this interval: ' + max);

    for (let i = 0; i < max; i++) {
        //grab an Order
        let orderEntry = orders.entries().next();
        let order = orderEntry.value[1];
        let key = orderEntry.value[0];
      
        //notify the user that it's fulfilled
        if (order) {
            let subscriber = subscribers.get(order.subscriberId);
            if (subscriber) {
                let msg = {
                    body: 'Your pint of ' + order.flavorName + ' is ready.  Order #' + key,
                    icon: "imgs/notification.png",
                    actions: [
                        { action: "accept", title: "I'm coming!" },
                        { action: "decline", title: "Forget it" },
                    ],

                }
                console.log('Notifying ' + subscriber.keys.auth + ' that ' + order.flavorName + ' is complete');
                publisher.notifyOrderComplete(subscriber, msg);
                orders.delete(key);
            }
        }
    }
}

//periodically fulfill an order
setInterval(() => {
    if (orders.size > 0) console.log(orders);
    if (subscribers.size > 0) console.log('Current Subscriber Count: ' + subscribers.size);
    fulfillOrder();
}, 30000)

app.listen(port, () => console.log('Server App is running on port ' + port))