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
                v-for="pending in rental_pending"
                :key="pending.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      pending.costumes.costumeimages[0].image_url ||
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
                      {{ pending.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ pending.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ pending.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ pending.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-Start : -</span>
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-End : -</span>
                    </div>
                    <div class="row justify-end">
                      <q-badge rounded color="orange" label="Pending" />
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

const status_heading_yes = ref(
  "Kang Rental akan segera mengonfirmasi pesanan kostum Kamu"
);
const rental_pending = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals/pending", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_pending.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});
</script>
