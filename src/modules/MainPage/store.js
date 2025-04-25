import { defineStore } from "pinia";
import { ref } from "vue";
export const useEventStore = defineStore("userEventDataStore", {
  state: () => ({
    eventData: ref(null),
    loading: ref(true),
  }),
  actions: {
    setEventData(data) {
      this.eventData = data;
    },
    setLoading(data) {
      this.loading = data;
    },
  },
});
