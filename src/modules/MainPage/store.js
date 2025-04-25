import { defineStore } from "pinia";
import { ref } from "vue";
export const useEventStore = defineStore("userEventDataStore", {
  state: () => ({
    eventData: ref(null),
  }),
  actions: {
    setEventData(data) {
      this.eventData = data;
    },
  },
});
