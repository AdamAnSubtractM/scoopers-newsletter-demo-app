const webPush = require('web-push');

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dZu7Ok45-zo:APA91bGEzYU6XTDW57M8WaHF8TEl_lORasE3ZfBPoCS5OST_eMOCgkhX_rnChSncf04bxfSp8yz4ohsGdyJt30vxlKgp4aq0NgnlHk5f8gSfdff4HkwTQ5FOI0hZebsTWt6mZGLsQnjh",
    "expirationTime": null,
    "keys": {
        "p256dh": "BFyNh9tcFYfvOMrQGYIERNVjoA4-PZvgzy1e5wh7iTZGO1LfqynpGEMWUFkh03ABGBPOCR7gUcZ4hxK_u0V_B74",
        "auth": "CjOBJQATJshtIwaJMoooYQ"
    }
};

const vapidPublicKey = 'BDcYnW5jjE7udhOj8D95s1nkRBBGekNvpd1nJGK0x1xiPmgrJabLYty-cKhM19BoAX73QV22X8C3BQcRHhRy7I8';
const vapidPrivateKey = 'QdeZ8HS5shR_UuIEetm8IVkcNJaoZ0m2626GWrPMvJ0';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: pushers@push.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
}

const notifyOrderComplete = (subscriber, msgDetails) => {
    webPush.sendNotification(
        subscriber,
        JSON.stringify(msgDetails),
        options
    )
        .then(() => console.log('subscriber notified'))
        .catch(error => console.error("Error in pushing notification", error));
}


//part of original training module
const notify = (subscribers) => {

    if (subscribers.size < 1) {
        console.log("No subscribers to notify");
        return;
    }

    subscribers.forEach((subscriber, id) => {
        webPush.sendNotification(
            subscriber,
            "Message goes here",
            options
        )
            .then(() => console.log(subscribers.size + ' subscribers notified'))
        .catch(error => console.error("Error in pushing notification", error))
    })
    
}

module.exports = {
    notify: notify,
    notifyOrderComplete: notifyOrderComplete
}