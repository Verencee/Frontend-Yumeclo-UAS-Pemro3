<template>
  <q-layout view="lHh Lpr lFf" class="yumecos-page-background">
    <q-header class="bg-deep-purple-9" elevated>
      <q-toolbar>
        <q-toolbar-title class="yumeclo-font"> Yume Clo </q-toolbar-title>

        <q-btn flat label="Home" to="/dashboard" />
        <q-btn flat label="Search" to="/search" />
        <q-btn flat label="My Rent">
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                to="/rental-user/pending"
                active-class="bg-orange-1 text-orange"
                exact
              >
                <q-item-section>Pending</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/rental-user/ongoing"
                active-class="bg-light-blue-1 text-light-blue"
                exact
              >
                <q-item-section>On going</q-item-section>
              </q-item>
              <q-item
                clickable
                to="/rental-user/active"
                active-class="bg-light-green-1 text-light-green-6"
                exact
              >
                <q-item-section>Active</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                clickable
                to="/rental-user/completed"
                active-class="bg-light-green-1 text-green"
                exact
              >
                <q-item-section>Completed</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn-dropdown flat dense icon="account_circle" aria-label="Profile">
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemClick"
              to="/dashboard/profile"
              active-class="bg-light-blue-1 text-light-blue"
              exact
            >
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
const router = useRouter();

const q = useQuasar();

const logout = () => {
  q.dialog({
    title: "Logout",
    message: "Kamu Yakin ingin Logout ?",
    cancel: true,
  }).onOk(async () => {
    q.notify({
      type: "positive",
      message: "Berhasil Logout, have a nice day :)",
      position: "top",
      color: "green",
    });
    localStorage.removeItem("authToken");
    router.push({ name: "loginpage" });
  });
};
</script>
