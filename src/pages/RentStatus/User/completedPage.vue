<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-xl">
        <q-container>
          <div class="q-my-md text-center">
            <div class="text-h4 yumeclo-font q-mb-lg">
              {{ status_heading_yes }}
            </div>
          </div>
          <div>
            <div class="row q-col-gutter-md">
              <div
                class="col-xs-12 col-sm-4 col-md-3 col-lg-3"
                v-for="completed in rental_completed"
                :key="completed.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      completed.costumes.costumeimages[0].image_url ||
                      'https://via.placeholder.com/250x300?text=No+Image'
                    "
                    style="
                      height: 350px;
                      width: 100%;
                      max-width: 400px;
                      margin: 0 auto;
                    "
                    fit="cover"
                  />
                  <q-card-section>
                    <div class="text-h6 text-break">
                      {{ completed.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ completed.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ completed.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ completed.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-Start :
                        {{ formatTanggal(completed.rental_start) }}</span
                      >
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-End :
                        {{ formatTanggal(completed.rental_end) }}</span
                      >
                    </div>
                    <div class="row justify-end">
                      <q-badge rounded color="blue-grey-6" label="Completed" />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </q-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

const status_heading_yes = ref("Daftar Kostum yang sudah pernah kamu Rental");
const rental_completed = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals/completed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_completed.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});

const formatTanggal = (tanggalString) => {
  if (!tanggalString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(tanggalString).toLocaleDateString("id-ID", options);
};
</script>
