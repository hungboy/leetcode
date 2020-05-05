// represent the following API, in other words implement the Events function/class

// scaffold
class Events {
  constructor() {
    this.topicMap = new Map();
  }
  // key: topicName, value: callback[]

  publish(topic, payload) {
    if (this.topicMap.has(topic)) {
      const callbacks = this.topicMap.get(topic);
      callbacks.forEach((callbackObject) => {
        const { callback, onlyOnce } = callbackObject;
        callback(payload);

        if (onlyOnce) {
          this.topicMap.set(
            topic,
            this.topicMap
              .get(topic)
              .filter((cbObject) => cbObject !== callbackObject)
          );
        }
      });
    }
  }

  // returns {remove}
  subscribe(topic, callback, onlyOnce = false) {
    if (!this.topicMap.has(topic)) {
      this.topicMap.set(topic, []);
    }

    const callbackObject = { callback, onlyOnce };

    this.topicMap.set(topic, [...this.topicMap.get(topic), callbackObject]);

    return {
      remove: () => {
        this.topicMap.set(
          topic,
          this.topicMap.get(topic).filter((cb) => cb !== callbackObject)
        );

        console.log({ callbacks: this.topicMap.get(topic) });
      },
    };
  }

  publishAll(payload) {
    let entries = [...this.topicMap.entries()];

    entries.forEach((entry) => {
      const [topic, callbacks] = entry;
      console.log({ topic, callbacks });
      callbacks.forEach((cb) => cb(payload));
    });
  }

  subscribeOnce(topic, callback) {
    this.subscribe(topic, callback, true);
  }

  // returns a Promise
  async subscribeOnceAsync(topic) {
    new Promise((resolve, reject) => {
      const callbackFunction = (topic) => (callback) => {
        this.subscribeOnce(topic, callback);
      };

      resolve(callbackFunction(topic));
    });
  }
}

const events = new Events();

// const topicSubscription = events.subscribe('topic', function (payload) {
//   console.log(`this topic has been triggered with ${payload}`);
// });

// events.publish('topic', 'this information');
// result:
// this topic has been triggered with this information

// const otherTopicSubscription = events.subscribe('topic', function (payload) {
//   console.log(`I have been also summoned with ${payload}`);
// });

// events.publish('topic', 'this information now');
// // result:
// // this topic has been triggered with this information now
// // I have been also summoned with this information now

// topicSubscription.remove();
// console.log('test case after remove');
// events.publish('topic', 'another call with this info');
// // result:
// // I have been also summoned with another call with this info

// const anotherTopicSubscription = events.subscribe('AnotherTopic', function (
//   payload
// ) {
//   console.log(`new topic, new life with ${payload}`);
// });

// events.publish('AnotherTopic', 'so much to publish!');
// // result:
// // new topic, new life with so much to publish!
// console.log('publish all');
// events.publishAll('every topic deserves to know!');

// // result:
// // I have been also summoned with every topic deserves to know!
// // new topic, new life with every topic deserves to know!

// events.subscribeOnce('topic', function (payload) {
//   console.log(`this will only execute once with ${payload}`);
// });

// events.publish('topic', 'more stuff!');
// // result:
// // I have been also summoned with more stuff!
// // this will execute only once with more stuff!
console.log('after only once');
// events.publish('topic', 'more stuff!');
// // result:
// // I have been also summoned with more stuff!

events.subscribeOnceAsync('topic').then(function (payload) {
  console.log(`this will execute only once with ${payload}`);
});

events.publish('topic', 'more stuff!');
// result:
// I have been also summoned with more stuff!
// this will execute only once with more stuff!

events.publish('topic', 'more stuff again!');
// // result:
// // I have been also summoned with more stuff again!
