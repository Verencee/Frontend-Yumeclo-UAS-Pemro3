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
                v-for="ongoing in rental_ongoing"
                :key="ongoing.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      ongoing.costumes.costumeimages[0].image_url ||
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
                      {{ ongoing.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ ongoing.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ ongoing.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ ongoing.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-Start : -</span>
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-End : -</span>
                    </div>
                    <div class="row justify-end q-mb-md">
                      <q-badge rounded color="blue" label="Ongoing" />
                    </div>
                    <div class="row justify-end">
                      <q-btn
                        outline
                        color="primary"
                        label="Konfirmasi"
                        @click="konfirmasi(ongoing)"
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const status_heading_yes = ref(
  "Silakan konfirmasi jika kostum sudah Kamu terima"
);
const rental_ongoing = ref([]);
const q = useQuasar();
const router = useRouter();

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals/ongoing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_ongoing.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});

const konfirmasi = (rentalData) => {
  q.dialog({
    title: "Pastikan kamu telah menerima kostum rentalmu!",
    message: `Konfirmasi kostum "${rentalData.costumes.name}"?`,
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const rental_id = rentalData.rental_id;
      const cos = rentalData.costumes.name;
      console.log(rental_id);

      await api.put(
        `/rental/start/${rental_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push({ name: "activePageUser" });
      q.notify({
        type: "positive",
        message: `Berhasil Memulai Rental kostum ${cos}`,
        color: "green",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "Gagal memulai Rental",
        position: "top",
      });
    }
  });
};
</script>
