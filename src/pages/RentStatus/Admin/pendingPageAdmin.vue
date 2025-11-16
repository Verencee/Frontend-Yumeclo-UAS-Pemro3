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
                v-for="pending_list in rental_pending_list"
                :key="pending_list.id"
              >
                <q-card
                  class="my-card full-height"
                  style="max-width: 400px; margin: 0 auto"
                >
                  <q-img
                    :src="
                      pending_list.costumes.costumeimages[0].image_url ||
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
                      {{ pending_list.costumes.name }}
                    </div>
                    <div class="text-subtitle1 text-primary">
                      Rp {{ pending_list.total_price }} / 4 hari
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Nama Penerima :</span>
                      {{ pending_list.users.full_name }}
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Alamat Kirim :</span>
                      {{ pending_list.users.address }}.
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-Start : -</span>
                    </div>
                    <div class="text-caption">
                      <span class="text-bold">Rental-End : -</span>
                    </div>
                    <div class="row justify-end q-mb-md">
                      <div class="q-gutter-x-sm">
                        <q-badge rounded color="orange" label="Pending" />
                      </div>
                    </div>
                    <div class="row justify-end">
                      <q-btn
                        outline
                        color="primary"
                        label="Kirim"
                        @click="konfirmasi(pending_list)"
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

const status_heading_yes = ref("Daftar Permintaan Rental Kostum");
const rental_pending_list = ref([]);
console.log(rental_pending_list);
const q = useQuasar();

const tampil = async () => {
  try {
    const token = localStorage.getItem("authToken");

    const res = await api.get("/rental/rentals-all-pending-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rental_pending_list.value = res.data.data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
};

onMounted(() => {
  tampil();
});

const konfirmasi = (rentalData) => {
  q.dialog({
    title: "Kostum ini menunggu persetujuan",
    message: `Konfirmasi rental kostum "${rentalData.costumes.name}"?`,
    cancel: true,
  }).onOk(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const rental_id = rentalData.rental_id;
      const cos = rentalData.costumes.name;
      console.log(rental_id);

      await api.put(
        `/rental/confirm/${rental_id}`,
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
        message: `Berhasil Konfirmasi Rental kostum ${cos}`,
        color: "green",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      q.notify({
        type: "negative",
        message: "Gagal Konfirmasi Rental",
        position: "top",
      });
    }
  });
};
</script>
