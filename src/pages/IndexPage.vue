<template>
  <q-page :class="containerClass">
    <img
      alt="Yume Clo Logo"
      src="~assets/Logo-Yume-Clo.png"
      style="width: 200px; height: 200px"
    />
    <h2 class="yumeclo-brand-font">Yume Clo</h2>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const containerClass = ref('flex flex-center column q-py-lg splash-container')

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    containerClass.value = 'flex flex-center column q-py-lg splash-container fade-out'
  }, 2500) 
  setTimeout(() => {
    router.push({ name: 'loginpage' })
  }, 3000)
})
</script>

<style scoped>
.splash-container {
  transition: opacity 0.5s ease-in-out;
}
.fade-out {
  opacity: 0;
}

</style>