<template>
  <div class="bg-transparent" id="allEvents">
    <div class="text-center fs-1 fw-bolder text-danger my-5">All Events</div>
    <div class="d-flex justify-content-end mb-4">
      <button
        class="add-new-btn btn btn-primary rounded-pill p-3"
        aria-label="Add new item"
        @click="newEvent()"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span class="plus-icon">+</span>
        New Event
      </button>
    </div>
    <div class="loading-spinner" v-if="isLoading"></div>

    <div class="row d-flex justify-content-start mx-auto gap-4" v-else>
      <div
        class="card col-md-4 text-center m-2 product-card golden-beige"
        v-for="(client, index) in clients?.data"
        :key="index"
        :style="{ backgroundColor: client?.color }"
      >
        <div
          class="card-body d-flex flex-column justify-content-end align-items-start position-relative text-start"
        >
          <div class="position-absolute top-0 end-0 p-2">
            <div class="d-flex flex-column align-items-end">
              <h6
                class="alert-date d-inline-flex flex-column align-items-center justify-content-center fs-5 mb-0 p-2"
              >
                <span class="text-uppercase small">until</span>
                <div class="d-flex flex-column text-center">
                  <span class="fs-3 fw-bold">{{
                    getDay(client?.expire_at)
                  }}</span>
                  <span class="small">{{ getMonth(client?.expire_at) }}</span>
                </div>
              </h6>
            </div>
          </div>
          <div class="row">
            <div class="col-4 ms-0 ps-0 text-start">
              <h2 id="card-id" class="badge ps-0 fs-2 golden-beige">
                {{ client?.id < 10 ? `0${client?.id}` : client?.id }}
              </h2>
            </div>
            <div
              class="col-8 border-start border-light border-3 golden-beige ms-0"
            >
              <h5 class="card-title">{{ client?.name }}</h5>
              <p class="card-text">{{ client?.address }}</p>
            </div>
          </div>
          <div class="position-absolute bottom-0 end-0 p-2">
            <span title="Edit">
              <i
                class="bi bi-pencil fs-5 golden-beige"
                @click="editEvent(client)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              ></i>
            </span>
            <span title="Delete" @click="deleteEvent(client?.id)">
              <i class="bi bi-trash text-danger ms-2 fs-5"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <EditModal
    :event="updateEvent"
    :getData="getEvent"
    :typeOfUpload="typeOfUpload"
  />
</template>
<script>
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import EditModal from "./EditModal.vue";
export default defineComponent({
  components: {
    EditModal,
  },
  setup() {
    const clients = ref([]);
    const getToken = JSON.parse(localStorage.getItem("token"));
    const updateEvent = ref({});
    const isLoading = ref(false);
    const typeOfUpload = ref("Edit");
    const getEvent = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(
          "https://interview.development.cat-sw.com/api/event",
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );

        clients.value = response.data;
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const deleteEvent = async (id) => {
      try {
        const response = await axios.delete(
          `https://interview.development.cat-sw.com/api/event/${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        getEvent();
      } catch (error) {
        console.error("Error deleting product data:", error);
      }
    };
    const editEvent = (data) => {
      updateEvent.value = data;
      typeOfUpload.value = "Edit";
    };
    const newEvent = () => {
      typeOfUpload.value = "Add New";
    };

    const getDay = (dateString) => {
      return new Date(dateString).getDate();
    };
    const getMonth = (dateString) => {
      return new Date(dateString).toLocaleString("default", { month: "long" });
    };

    onMounted(() => {
      getEvent();
    });
    return {
      clients,
      updateEvent,
      isLoading,
      typeOfUpload,
      deleteEvent,
      editEvent,
      getEvent,
      getDay,
      getMonth,
      newEvent,
    };
  },
});
</script>
<style scoped>
.product-card {
  background-image: url("../../../assets/imgs/cardImg.png");
  background-size: cover;
  background-position: center;

  height: 300px;
  width: 18rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.object-fit-cover {
  object-fit: cover;
  object-position: center;
}

.alert-date {
  background-color: rgba(219, 204, 182, 0.8);
  color: whitesmoke;
  width: 100%;
  text-align: center;

  margin-top: -10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
}
.golden-beige {
  color: RGB(219, 204, 182);
}

.add-new-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #dc3545;
  border-color: #dc3545;
  z-index: 10;
}

.add-new-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  background-color: #bb2d3b;
  border-color: #bb2d3b;
}

.plus-icon {
  font-size: 1.5rem;
  line-height: 1;
}
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #bb2d3b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 100px auto;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
