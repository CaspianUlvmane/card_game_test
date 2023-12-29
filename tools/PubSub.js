const listeners = {};

export const PubSub = {
  subscribe: function (data) {
    let { event, listener, events } = data;

    if (!events) {
      events = [event];
    }

    events.forEach((event) => {
      if (listeners[event] === undefined) {
        listeners[event] = [listener];
      } else {
        listeners[event] = [...listeners[event], listener];
      }
    });
  },

  publish: function (data) {
    let { event, detail } = data;
    if (!event) {
      console.log("No Event Type");
      return;
    }

    if (doLog(event)) {
      console.log("Event Published: " + event, detail);
    }

    if (listeners[event] === undefined) {
      doLog && console.log(`Event (${event}) has no listeners`);
    }

    listeners[event].forEach((listener) => {
      if (typeof listener === "function") {
        listener(detail);
      } else {
        listener.dispatchEvent(new CustomEvent(event, { detail }));
      }
    });
  },
};

function doLog(event) {
  if (event.indexOf("RENDER::") > -1) return false;
  if (event.indexOf("RENDER::") > -1 && event.indexOf("users_in_") === -1)
    return false;
  return true;
}
