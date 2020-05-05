export interface IEvent {
  type: string;
  payload?: any;
}
export type EventHandler = (event: IEvent) => Promise<void>;

export type AddSubscriber = (
  topic,
  eventHandler: EventHandler
) => RemoveSubscriber;
export type RemoveSubscriber = () => void;

export type PublishEvent = (topic: string, event: IEvent) => Promise<void>;

export type AddTopic = (topic: string) => void;
export type RemoveTopic = (topic: string) => void;
export type GetTopics = () => ITopics;

export interface ITopics {
  [name: string]: EventHandler[];
}

export class EventChannel {
  private topics: ITopics;

  constructor() {
    this.topics = {};
  }

  addTopic: AddTopic = (topic: string) => {
    if (this.topics[topic] === undefined) {
      this.topics[topic] = [];
    }
  };

  removeTopic: RemoveTopic = (topic: string) => {
    if (typeof this.topics[topic] !== undefined) {
      delete this.topics[topic];
    }
  };

  getTopics: GetTopics = () => {
    return this.topics;
  };

  publishEvent: PublishEvent = async (topic, event) => {
    const eventHandlers = this.topics[topic] ?? [];

    await Promise.all(eventHandlers.map((eventHandler) => eventHandler(event)));
  };

  addSubscriber: AddSubscriber = (topic, eventHandler) => {
    if (this.topics[topic] === undefined) {
      this.addTopic(topic);
    }

    this.topics[topic] = [...this.topics[topic], eventHandler];

    const removeSubscriber = () => {
      const nextTopic = this.topics[topic].filter(
        (handler) => handler !== eventHandler
      );
      this.topics[topic] = nextTopic;
    };

    return removeSubscriber;
  };
}
