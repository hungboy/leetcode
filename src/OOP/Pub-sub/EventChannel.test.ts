import { EventHandler, EventChannel, IEvent } from './EventChannel';

describe('Pub-Sub', () => {
  let channel;
  const mock_handler_1_a = jest.fn();
  const mock_handler_1_b = jest.fn();
  const mock_handler_2_a = jest.fn();

  describe('Given a Channel with two topics', () => {
    let removeHandler1A, removeHandler1B, removeHandler2A;
    beforeEach(() => {
      channel = new EventChannel();
      mock_handler_1_a.mockReset();
      mock_handler_1_b.mockReset();
      mock_handler_2_a.mockReset();

      const handler_1_a = async (event) => {
        mock_handler_1_a(event);
      };
      const handler_1_b = async (event) => {
        mock_handler_1_b(event);
      };
      const handler_2_a = async (event) => {
        mock_handler_2_a(event);
      };

      channel.addTopic('1');
      channel.addTopic('2');
      removeHandler1A = channel.addSubscriber('1', handler_1_a);

      removeHandler1B = channel.addSubscriber('1', handler_1_b);

      removeHandler2A = channel.addSubscriber('2', handler_2_a);
    });

    test('It contains the correct number of topics', () => {
      expect.assertions(1);
      const channelTopics = channel.getTopics();
      expect(Object.keys(channelTopics).length).toBe(2);
    });

    test('It adds handlers', () => {
      expect.assertions(3);

      expect(typeof removeHandler1A === 'undefined').toBe(false);
      expect(typeof removeHandler1B === 'undefined').toBe(false);
      expect(typeof removeHandler2A === 'undefined').toBe(false);
    });

    describe('When an event is published on a channel', () => {
      test('It calls associated event handlers', async () => {
        const mockEvent: IEvent = { type: 'event_1' };
        await channel.publishEvent('1', mockEvent);

        expect.assertions(3);

        expect(mock_handler_1_a).toHaveBeenNthCalledWith(1, mockEvent);
        expect(mock_handler_1_b).toHaveBeenNthCalledWith(1, mockEvent);
        expect(mock_handler_2_a).not.toHaveBeenNthCalledWith(1, mockEvent);
      });
    });

    test("When an event handler is removed, Removed Handler isn't called when an event is published", async () => {
      removeHandler1A();

      const mockEvent: IEvent = { type: 'event_2' };
      expect.assertions(3);
      await channel.publishEvent('1', mockEvent);

      expect(mock_handler_1_a).toHaveBeenCalledTimes(0);
      expect(mock_handler_1_b).toHaveBeenNthCalledWith(1, mockEvent);
      expect(mock_handler_2_a).toHaveBeenCalledTimes(0);
    });

    describe('When a topic is removed', () => {
      beforeEach(() => {
        channel.removeTopic('1');
      });

      describe('And an event is called for said topic', () => {
        test('The topic is removed', () => {
          expect.assertions(1);
          expect(Object.keys(channel.getTopics()).length).toBe(1);
        });

        test('No handlers are called', async () => {
          const mockEvent: IEvent = { type: 'event_3' };

          await channel.publishEvent('1', mockEvent);
          expect.assertions(3);
          expect(mock_handler_1_a).toHaveBeenCalledTimes(0);
          expect(mock_handler_1_b).toHaveBeenCalledTimes(0);
          expect(mock_handler_2_a).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
