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
                v-for="active in rental_active"
                :key="active.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      active.costumes.costumeimages[0].image_url ||
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
                      {{ active.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ active.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ active.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ active.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-Start :
                        {{ formatTanggal(active.rental_start) }}</span
                      >
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-End :
                        {{ formatTanggal(active.rental_end) }}</span
                      >
                    </div>
                    <div class="row justify-end q-mb-md">
                      <div class="q-gutter-x-sm">
                        <!-- <q-badge rounded color="teal-6" label="Returning" /> -->
                        <q-badge rounded color="light-green-6" label="Active" />
                      </div>
                    </div>
                    <div class="row justify-end">
                      <q-btn
                        outline
                        color="primary"
                        label="Kembalikan"
                        @click="kembalikan(active)"
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
  "Daftar Rental aktif, jangan lupa kembalikan tepat waktu :)"
);
const rental_active = ref([]);
const q = useQuasar();
const router = useRouter();

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_active.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
});

const kembalikan = (rentalData) => {
  q.dialog({
    title: "Pastikan kamu telah packing kostum rentalnya!",
    message: `Kembalikan kostum "${rentalData.costumes.name}"?`,
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const rental_id = rentalData.rental_id;
      const cos = rentalData.costumes.name;
      console.log(rental_id);

      await api.put(
        `/rental/return/${rental_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push({ name: "dashboardUserpage" });
      q.notify({
        type: "positive",
        message: `Berhasil Mengembalikan Rental kostum ${cos}`,
        color: "green",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "Gagal mengembalikan Rental",
        position: "top",
      });
    }
  });
};

const formatTanggal = (tanggalString) => {
  if (!tanggalString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(tanggalString).toLocaleDateString("id-ID", options);
};
</script>
