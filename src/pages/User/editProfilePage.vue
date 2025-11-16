<template>
  <q-layout>
    <q-page-container class="q-pa-xl">
      <q-page class="yumecos-page-background">
        <div class="row">
          <div class="col-md-12 col-xs-12 flex flex-center">
            <q-card class="my-card q-pa-md form-upload-rent">
              <q-card-section class="text-center">
                <div class="text-h5 text-weight-bold text-deep-purple-1">
                  <span style="font-size: 1.5em">Profile</span>
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Username
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="profile_user.username"
                        :dense="dense"
                        color="purple-9"
                        :rules="[(val) => val !== '' || 'Tidak boleh kosong!']"
                        lazy-rules
                        readonly
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Full Name
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="profile_user.full_name"
                        :dense="dense"
                        color="purple-9"
                        :rules="[(val) => val !== '' || 'Tidak boleh kosong!']"
                        lazy-rules
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Email
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="profile_user.email"
                        :dense="dense"
                        color="purple-9"
                        :rules="[(val) => val !== '' || 'Tidak boleh kosong!']"
                        lazy-rules
                        readonly
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      No HP
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="profile_user.phone_number"
                        :dense="dense"
                        color="purple-9"
                        :rules="[(val) => val !== '' || 'Tidak boleh kosong!']"
                        lazy-rules
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Alamat
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        v-model="profile_user.address"
                        outlined
                        autogrow
                        color="purple-9"
                        @keydown="processTextareaFill"
                        @focus="processTextareaFill"
                        :rules="[(val) => val !== '' || 'Tidak boleh kosong!']"
                        lazy-rules
                      />
                    </div>
                  </div>

                  <q-separator inset />

                  <q-btn
                    color="deep-purple"
                    label="Edit Profile"
                    class="full-width"
                    type="submit"
                    no-caps
                    unelevated
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const q = useQuasar();

const profile_user = ref({
  username: "",
  full_name: "",
  email: "",
  phone_number: "",
  address: "",
});

onMounted(() => {
  ambilDataUser();
});

const ambilDataUser = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    profile_user.value = res.data;
  } catch (error) {
    console.error("Gagal ambil data profile:", error);
    q.notify({
      type: "negative",
      message: "Gagal ambil data profile",
      position: "top",
    });
  }
};

const onSubmit = async () => {
  q.dialog({
    title: "Edit Profile",
    message: "Ingin Edit profile kamu ?",
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await api.put("/user/profile", profile_user.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      q.notify({
        type: "positive",
        message: res.data.Message || "Edit profile berhasil ! :)",
        color: "green",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "error.response.data",
        position: "top",
      });
    }
  });
};
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.q-field__control {
  border-radius: 12px;
}

.q-btn.full-width {
  border-radius: 20px;
  font-weight: 500;
}

.form-upload-rent {
  width: 100%;
  max-width: 1000px;
}
</style>
