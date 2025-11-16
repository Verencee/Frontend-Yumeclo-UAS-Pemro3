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
                v-for="returning_list in rental_returning_list"
                :key="returning_list.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      returning_list.costumes.costumeimages[0].image_url ||
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
                      {{ returning_list.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ returning_list.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ returning_list.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ returning_list.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-Start :
                        {{ formatTanggal(returning_list.rental_start) }}</span
                      >
                    </div>
                    <div class="text-caption">
                      <span class="text-bold"
                        >Rental-End :
                        {{ formatTanggal(returning_list.rental_end) }}</span
                      >
                    </div>
                    <div class="row justify-end q-mb-md">
                      <div class="q-gutter-x-sm">
                        <q-badge rounded color="teal-6" label="Returning" />
                      </div>
                    </div>
                    <div class="row justify-end">
                      <q-btn
                        outline
                        color="primary"
                        label="Konfirmasi"
                        @click="konfirmasi(returning_list)"
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

const status_heading_yes = ref("Daftar Pengembalian Rental Kostum");
const rental_returning_list = ref([]);
console.log(rental_returning_list);
const q = useQuasar();

const tampil = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals-all-returning-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_returning_list.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
};

onMounted(() => {
  tampil();
});

const konfirmasi = (rentalData) => {
  q.dialog({
    title: "Konfirmasi Pengembalian Kostum Rental",
    message: `Akan mengembalikan stock Kostum Rental "${rentalData.costumes.name}"?`,
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const rental_id = rentalData.rental_id;
      const cos = rentalData.costumes.name;
      console.log(rental_id);

      await api.put(
        `/rental/complete/${rental_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      tampil();
      q.notify({
        type: "positive",
        message: `Berhasil Mengembalikan stock kostum ${cos}`,
        color: "green",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "Gagal Mengembalikan kostum rental",
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
