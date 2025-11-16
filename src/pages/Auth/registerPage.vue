<template>
  <q-layout>
    <q-page-container>
      <q-page class="yumecos-page-background">
        <div class="row">
          <div class="col-md-4 col-xs-12 fixed-center">
            <q-card class="my-card q-pa-md">
              <q-card-section class="text-center">
                <div class="text-h5 text-weight-bold text-deep-purple-1">
                  <span style="font-size: 1.5em">Sign Up</span>
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <!-- USR -->
                  <q-input
                    v-model="username"
                    label="Username"
                    :dense="dense"
                    :rules="[(val) => val !== '' || 'Mohon isi Username']"
                    lazy-rules
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="purple-10" />
                    </template>
                  </q-input>

                  <!-- NIK -->
                  <q-input
                    v-model="nikktp"
                    label="NIK KTP"
                    :dense="dense"
                    :rules="[(val) => val !== '' || 'Mohon isi NIK KTP']"
                    lazy-rules
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" color="purple-10" />
                    </template>
                  </q-input>

                  <!-- Email -->
                  <q-input
                    v-model="email"
                    label="Email"
                    :dense="dense"
                    :rules="[(val) => val !== '' || 'Mohon isi Email']"
                    lazy-rules
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" color="purple-10" />
                    </template>
                  </q-input>

                  <!-- PW -->
                  <q-input
                    v-model="password"
                    label="Password"
                    :dense="dense"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[(val) => val !== '' || 'Mohon isi Password']"
                    lazy-rules
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" color="purple-10" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <q-btn
                    color="deep-purple"
                    label="Sign Up"
                    class="full-width"
                    type="submit"
                    no-caps
                    unelevated
                  />

                  <div class="text-center text-caption">
                    Already have an account?
                    <router-link to="/login" class="text-deep-purple text-bold">
                      Sign In
                    </router-link>
                  </div>
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
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const username = ref("");
const password = ref("");
const nikktp = ref("");
const email = ref("");
const isPwd = ref(true);
const q = useQuasar();
const router = useRouter();

const onSubmit = async () => {
  try {
    const res = await api.post("/user/register", {
      username: username.value,
      nik_ktp: nikktp.value,
      email: email.value,
      password: password.value,
    });
    q.notify({
      type: "positive",
      message: res.data.Message || "Registrasi berhasil! :)",
      position: "top",
    });
    router.push({ name: "loginpage" });
  } catch (error) {
    console.log(error);
    q.notify({
      type: "negative",
      message: error.response.data,
      position: "top",
    });
  }
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
</style>
