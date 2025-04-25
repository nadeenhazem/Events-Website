<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ uploadType }} Event
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row">
            <div class="mb-3 col-md-12">
              <label for="inputName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="Update your name"
                v-model="editData.name"
              />
            </div>

            <div class="mb-3">
              <label for="inputAddress" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Update your address"
                v-model="editData.address"
              />
            </div>
            <div class="mb-3">
              <label for="inputDate" class="form-label">Expire Date</label>
              <input
                type="date"
                class="form-control"
                id="inputDate"
                v-model="editData.expire_at"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn update-btn"
            @click="editEvent"
            data-bs-dismiss="modal"
            :disabled="
              editData.name === '' ||
              editData.address === '' ||
              editData.expire_at === null
            "
          >
            {{ uploadType === "Add New" ? "Add" : "Update" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { defineComponent, watch, ref } from "vue";

export default defineComponent({
  props: ["event", "getData", "typeOfUpload"],
  setup(props) {
    const getToken = JSON.parse(localStorage.getItem("token"));
    const editData = ref({
      name: "",
      address: "",
      expire_at: null,
    });
    const updateData = ref();
    const uploadType = ref("Edit");
    const editEvent = async () => {
      try {
        const response = await axios.post(
          uploadType.value == "Edit"
            ? `https://interview.development.cat-sw.com/api/update-event/${updateData.value?.id}`
            : `https://interview.development.cat-sw.com/api/create-event`,
          {
            address: editData.value.address,
            name: editData.value.name,
            expire_at: editData.value.expire_at,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );

        props.getData();
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    watch(
      () => props.event,
      (newValue) => {
        updateData.value = newValue;
        editData.value.name = newValue?.name;
        editData.value.address = newValue?.address;
        editData.value.expire_at = newValue?.expire_at;
      },
      { immediate: true }
    );
    watch(
      () => props.typeOfUpload,
      (newValue) => {
        uploadType.value = newValue;
        if (newValue === "Add New") {
          editData.value.name = "";
          editData.value.address = "";
          editData.value.expire_at = null;
        } else {
          editData.value.name = updateData.value?.name;
          editData.value.address = updateData.value?.address;
          editData.value.expire_at = updateData.value?.expire_at;
        }
      }
    );

    return {
      editData,
      updateData,
      editEvent,
      uploadType,
    };
  },
});
</script>
<style scoped>
.update-btn {
  background-color: RGB(219, 204, 182);
}
.update-btn:hover {
  background-color: RGB(207, 192, 170);
}
</style>
