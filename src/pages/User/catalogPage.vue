<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-xl">
        <q-container>
          <div class="q-my-xl text-center">
            <div class="text-h4 yumeclo-font q-mb-lg">Cari Kostum</div>
            <div class="row justify-center">
              <div class="col-md-10">
                <q-input
                  v-model="searchCos"
                  filled
                  type="search"
                  placeholder="Ingin Cosplay apa Cosplayer"
                >
                  >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="q-mb-lg text-start">
            <div class="text-h5 yumeclo-font">Katalog Kostum</div>
          </div>

          <!-- Card -->
          <div>
            <div class="row q-col-gutter-md">
              <div
                class="col-xs-12 col-sm-4 col-md-3 col-lg-2"
                v-for="kostum in kostum_terbaru"
                :key="kostum.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 298px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      kostum.image ||
                      'https://via.placeholder.com/250x300?text=No+Image'
                    "
                    style="
                      height: 250px;
                      width: 100%;
                      max-width: 298px;
                      margin: 0 auto;
                    "
                    fit="cover"
                  />
                  <q-card-section>
                    <div class="text-h6 text-break">{{ kostum.name }}</div>
                    <div class="text-subtitle1 text-primary">
                      Rp.{{ kostum.price }} / 4 hari
                    </div>
                    <div class="text-caption">Ukuran: {{ kostum.size }}</div>
                    <div class="text-caption">Gender: {{ kostum.gender }}</div>
                    <div class="text-caption">Stok: {{ kostum.stock }}</div>
                    <div class="row justify-end">
                      <q-btn
                        outline
                        color="primary"
                        label="More"
                        :to="`/costume/${kostum.id}`"
                      />
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

const kostum_terbaru = ref([]);
const searchCos = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/costume");
    kostum_terbaru.value = res.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});
</script>
