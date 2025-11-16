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
                v-for="active_list in rental_active_list"
                :key="active_list.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      active_list.costumes.costumeimages[0].image_url ||
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
                      {{ active_list.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ active_list.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ active_list.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ active_list.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-Start :
                        {{ formatTanggal(active_list.rental_start) }}</span
                      >
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-End :
                        {{ formatTanggal(active_list.rental_end) }}</span
                      >
                    </div>
                    <div class="row justify-end q-mb-md">
                      <div class="q-gutter-x-sm">
                        <q-badge rounded color="light-green-6" label="Active" />
                      </div>
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

const status_heading_yes = ref("Daftar Active Rental Kostum");
const rental_active_list = ref([]);
console.log(rental_active_list);

const tampil = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals-all-active-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_active_list.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
};

onMounted(() => {
  tampil();
});

const formatTanggal = (tanggalString) => {
  if (!tanggalString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(tanggalString).toLocaleDateString("id-ID", options);
};
</script>
