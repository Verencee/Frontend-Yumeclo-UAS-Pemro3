<template>
  <q-page class="q-pa-md">
    <q-container>
      <div class="row q-col-gutter-md items-start q-pa-xl">
        <div class="col-1"></div>
        <!-- R Kiri -->
        <div class="col-12 col-md-4">
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            height="420px"
            class="q-mb-md"
          >
            <q-carousel-slide
              v-for="(gambar_utama, index) in gambar"
              :key="index"
              :name="index"
              :img-src="gambar_utama"
            />
          </q-carousel>

          <div class="row q-mt-sm q-col-gutter-sm justify-start">
            <div
              v-for="(img, index) in gambar"
              :key="index"
              class="col-6 col-md-4"
            >
              <q-img
                :src="img"
                :class="slide === index ? 'border-active' : ''"
                style="border-radius: 6px; height: 125px; cursor: pointer"
                @click="slide = index"
              />
            </div>
          </div>
        </div>

        <div class="col-1"></div>

        <!-- R Kanan -->
        <div class="col-12 col-md-6 q-pa-none q-mt-md">
          <q-card class="my-card-katalog">
            <div class="row q-col-gutter-sm">
              <div
                class="col-md-12 yumeclo-font-katalog-heading q-mt-md q-ml-md"
              >
                {{ kostum_detail.name }}
              </div>
              <div
                class="col-md-12 yumeclo-font-katalog-heading-harga q-mt-md q-ml-md text-pink-7"
              >
                Rp.{{ kostum_detail.price }} / 4 hari
              </div>
              <div
                class="col-md-12 yumeclo-font-katalog-heading-2 q-mt-md q-ml-md"
              >
                Deskripsi Kostum
              </div>
              <div class="col-md-12 q-ml-md">
                {{ kostum_detail.description }}
              </div>
              <div
                class="col-md-12 yumeclo-font-katalog-heading-2 q-mt-md q-ml-md"
              >
                Ukuran Kostum : {{ kostum_detail.size }}
              </div>
              <div
                class="col-md-12 yumeclo-font-katalog-heading-2 q-mt-md q-ml-md"
              >
                Stok : {{ kostum_detail.stock }}
              </div>
              <div class="col-md-12"></div>
              <div
                class="col-md-12 yumeclo-font-katalog-heading-2 q-mt-md q-ml-md q-mb-lg"
              >
                <div class="row justify-end q-mr-xl q-gutter-md">
                  <q-btn
                    unelevated
                    color="negative"
                    label="Hapus Katalog"
                    @click="delete_cos"
                  />
                  <q-btn
                    unelevated
                    color="orange"
                    label="Edit Katalog"
                    :to="`/edit-cos/${costumeId}`"
                  />
                  <q-dialog v-model="dialogConfirm" persistent>
                    <q-card style="min-width: 400px">
                      <q-card-section class="row items-center">
                        <span class="text-h6">Form Rental Kostum</span>
                      </q-card-section>

                      <q-separator />

                      <q-card-section class="row items-center q-pa-sm">
                        <q-avatar
                          icon="person"
                          color="deep-purple-7"
                          text-color="white"
                        />
                        <div class="q-ml-sm row col items-center">
                          <div class="col-4 text-weight-medium">Nama:</div>
                          <div class="col-8">{{ nama }}</div>
                        </div>
                      </q-card-section>

                      <q-card-section class="row items-center q-pa-sm">
                        <q-avatar
                          icon="location_on"
                          color="deep-purple-7"
                          text-color="white"
                        />
                        <div class="q-ml-sm row col items-center">
                          <div class="col-4 text-weight-medium">Alamat:</div>
                          <div class="col-8">
                            {{ alamat }}
                          </div>
                        </div>
                      </q-card-section>

                      <q-card-section class="row items-center q-pa-sm">
                        <q-avatar
                          icon="smartphone"
                          color="deep-purple-7"
                          text-color="white"
                        />
                        <div class="q-ml-sm row col items-center">
                          <div class="col-4 text-weight-medium">No HP:</div>
                          <div class="col-8">{{ ph_number }}</div>
                        </div>
                      </q-card-section>

                      <q-card-section class="row items-center q-pa-sm">
                        <q-avatar
                          icon="checkroom"
                          color="deep-purple-7"
                          text-color="white"
                        />
                        <div class="q-ml-sm row col items-center">
                          <div class="col-4 text-weight-medium">Kostum:</div>
                          <div class="col-8">{{ kostum_detail.name }}</div>
                        </div>
                      </q-card-section>

                      <q-card-section class="row items-center q-pa-sm">
                        <q-avatar
                          icon="payments"
                          color="deep-purple-7"
                          text-color="white"
                        />
                        <div class="q-ml-sm row col items-center">
                          <div class="col-4 text-weight-medium">Harga:</div>
                          <div class="col-8">
                            Rp. {{ kostum_detail.price }} / 4 hari
                          </div>
                        </div>
                      </q-card-section>

                      <q-separator />

                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Batal"
                          color="primary"
                          v-close-popup
                        />
                        <q-btn
                          flat
                          label="Rental"
                          color="primary"
                          v-close-popup
                          @click="rental_process"
                        />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </q-container>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const q = useQuasar();
const slide = ref(0);
const dialogConfirm = ref(false);
const route = useRoute();
const router = useRouter();
const costumeId = route.params.id;
const nama = ref("");
const alamat = ref("");
const ph_number = ref("");
const kostum_detail = ref([]);
const gambar = ref([]);

onMounted(async () => {
  try {
    const res = await api.get(`/costume/detail/${costumeId}`);
    const data = res.data;

    kostum_detail.value = {
      name: data.name,
      description: data.description,
      price: data.price,
      size: data.size,
      stock: data.stock,
    };

    gambar.value = data.gambar;
    console.log(kostum_detail);
    console.log(gambar);
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});

const delete_cos = () => {
  q.dialog({
    title: "Hapus Katalog Rental",
    message: `Konfirmasi menghapus kostum "${kostum_detail.value.name}"?`,
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log();

      await api.delete(`/costume/delete/${costumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      q.notify({
        type: "positive",
        message: "Berhasil Hapus Katalog",
        color: "green",
        position: "top",
      });
      router.push({ name: "dashboardAdminpage" });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "Gagal menghapus katalog",
        position: "top",
      });
    }
  });
};

const rental_process = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.post(
      "/rental/create-rental",
      {
        costume_id: costumeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    q.notify({
      type: "positive",
      message: res.data.Message || "Berhasil Rental Kostum :)",
      position: "top",
      color: "green",
    });
    console.log("Rental berhasil:", res.data);
    router.push({ name: "pendingPageUser" });
  } catch (error) {
    q.notify({
      type: "negative",
      message: error.response.data || "Gagal Rental Kostum",
      position: "top",
    });
    console.error("Gagal mengirim data:", error);
  }
};
</script>

<style>
.border-active {
  border: solid;
  border-color: #ff0000;
}
</style>
