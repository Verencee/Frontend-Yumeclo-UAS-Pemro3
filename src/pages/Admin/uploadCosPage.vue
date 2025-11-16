<template>
  <q-layout>
    <q-page-container class="q-pa-xl">
      <q-page class="yumecos-page-background">
        <div class="row">
          <div class="col-md-12 col-xs-12 flex flex-center">
            <q-card class="my-card q-pa-md form-upload-rent">
              <q-card-section class="text-center">
                <div class="text-h5 text-weight-bold text-deep-purple-1">
                  <span style="font-size: 1.5em">Tambah Kostum Rental</span>
                </div>
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Nama Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="formCos.name"
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
                      Deskripsi Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        v-model="formCos.description"
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

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Harga Sewa Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="formCos.price"
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
                      Stok Kostum Rental
                    </div>
                    <div class="col-md-8 col-12">
                      <q-input
                        outlined
                        v-model="formCos.stock"
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
                      Kategori Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-select
                        v-model="formCos.category_id"
                        outlined
                        :options="kategoriCos"
                        label="Kategori Kostum"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        :rules="[
                          (val) => val !== null || 'Pilih kategori kostum!',
                        ]"
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Ukuran Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-select
                        v-model="formCos.size"
                        outlined
                        :options="['S', 'M', 'L', 'XL']"
                        label="Ukuran Kostum"
                        :rules="[(val) => val !== '' || 'Pilih Ukuran!']"
                        lazy-rules
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Gender Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-select
                        v-model="formCos.gender"
                        outlined
                        :options="['Pria', 'Wanita']"
                        label="Gender Kostum"
                        :rules="[(val) => val !== '' || 'Pilih Gender!']"
                        lazy-rules
                      />
                    </div>
                  </div>

                  <div class="row q-mt-md q-mb-md">
                    <div
                      class="col-md-4 col-12 flex items-center text-h6 text-weight-bold text-deep-purple-1"
                    >
                      Gambar Kostum
                    </div>
                    <div class="col-md-8 col-12">
                      <q-uploader
                        ref="uploaderRef"
                        color="deep-purple-7"
                        label="Upload 4 Gambar Kostum"
                        accept=".jpg, .png, .jpeg"
                        multiple
                        auto-upload="false"
                        :max-files="4"
                        :hide-upload-btn="true"
                        style="max-width: 400px"
                      />
                    </div>
                  </div>

                  <q-separator inset />

                  <q-btn
                    color="deep-purple"
                    label="Posting"
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
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const q = useQuasar();
const router = useRouter();

const kategoriCos = ref([]);
const uploaderRef = ref(null);

const formCos = ref({
  name: "",
  description: "",
  price: "",
  stock: "",
  size: "",
  gender: "",
  category_id: null,
});

onMounted(() => {
  ambilKategori();
});

const ambilKategori = async () => {
  try {
    const res = await api.get("/costume/category");

    kategoriCos.value = res.data.map((kategori) => ({
      label: kategori.name,
      value: kategori.category_id,
    }));
  } catch (error) {
    console.error("Gagal ambil data kategori:", error);
    q.notify({
      type: "negative",
      message: "Gagal ambil kategori",
      position: "top",
    });
  }
};

const onSubmit = async () => {
  const files = uploaderRef.value.files || [];

  if (files.length !== 4) {
    q.notify({
      type: "negative",
      message: "Harus upload 4 gambar ya",
      position: "top",
    });
    return;
  }

  const formDataCos = new FormData();
  formDataCos.append("name", formCos.value.name);
  formDataCos.append("description", formCos.value.description);
  formDataCos.append("price", formCos.value.price);
  formDataCos.append("stock", formCos.value.stock);
  formDataCos.append("size", formCos.value.size);
  formDataCos.append("gender", formCos.value.gender);
  formDataCos.append("category_id", formCos.value.category_id);

  files.forEach((file) => {
    formDataCos.append("image", file);
  });

  try {
    const token = localStorage.getItem("authToken");

    await api.post("/costume/upload", formDataCos, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    q.notify({
      type: "positive",
      message: "Berhasil posting Kostum rental",
      position: "top",
    });

    router.push({ name: "dashboardAdminpage" });
  } catch (error) {
    console.error("Upload gagal:", error);
    q.notify({
      type: "negative",
      message: "Gagal posting Kostum Rental",
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

.form-upload-rent {
  width: 100%;
  max-width: 1000px;
}
</style>
