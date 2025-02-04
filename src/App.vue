<template>
  <!-- HEADER -->
  <header-component-vue v-if="showHeader" @toggleAside="toggleAside" />
  <!-- Transición para el aside -->
  <transition name="slide">
    <aside-component-vue v-if="showAside" />
  </transition>
  <!-- NAVIGATION -->
  <page-title-component-vue v-if="showPageTitle" />
  <!-- MAIN CONTENT -->
  <router-view />
  <!-- <button-float-component-vue v-if="showButton" />-->
  <!-- FOOTER -->
  <footer-component-vue v-if="showFooter" />
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import HeaderComponentVue from '@/layouts/HeaderComponent.vue';
import FooterComponentVue from '@/layouts/FooterComponent.vue';
import AsideComponentVue from '@/layouts/AsideComponent.vue';
import PageTitleComponentVue from '@/layouts/PageTitleComponent.vue';
//import ButtonFloatComponentVue from '@/layouts/widgets/ButtonFloatComponent.vue';

// Importa los componentes
const route = useRoute();

// Estado para controlar la visibilidad del aside
const isAsideVisible = ref(true);

// Función para alternar la visibilidad del aside
const toggleAside = () => {
  if (route.name !== 'not-found' && route.path !== '/login' && route.path !== '/') {
    isAsideVisible.value = !isAsideVisible.value;

    // Alterna la clase en el body cuando el aside se muestra o se oculta
    if (isAsideVisible.value) {
      document.body.classList.add('sidebar-expanded');
      document.body.classList.remove('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-expanded');
      document.body.classList.add('sidebar-collapsed');
    }
  }
};

// Asegúrate de aplicar la clase adecuada al cargar la página
onMounted(() => {
  if (isAsideVisible.value) {
    document.body.classList.add('sidebar-expanded');
    document.body.classList.remove('sidebar-collapsed');
  } else {
    document.body.classList.remove('sidebar-expanded');
    document.body.classList.add('sidebar-collapsed');
  }
});


// Determina si se deben mostrar los componentes
const showHeader = computed(() =>
  route.path !== '/' &&
  route.name !== 'not-found' &&
  route.name !== 'login-poi' &&
  route.name !== 'login-administracion' &&
  route.name !== 'zoom' &&
  route.path !== '/sgd/pendientes');

const showAside = computed(() => isAsideVisible.value &&
  route.path !== '/' &&
  route.name !== 'not-found' &&
  route.name !== 'login-poi' &&
  route.name !== 'login-administracion' &&
  route.name !== 'zoom' &&
  route.path !== '/sgd/pendientes');

const showPageTitle = computed(() =>
  route.path !== '/' &&
  route.name !== 'not-found' &&
  route.name !== 'login-poi' &&
  route.name !== 'login-administracion' &&
  route.name !== 'zoom' &&
  route.path !== '/sgd/pendientes');

const showFooter = computed(() => 
route.path !== '/' && 
route.name !== 'not-found' && 
route.name !== 'login-poi' && 
route.name !== 'login-administracion' &&
route.name !== 'zoom' &&
route.path !== '/sgd/pendientes');
//const showButton = computed(() => route.name !== 'not-found' && route.path !== '/login' && route.path !== '/');


</script>

<style>
html,
body {
  margin: 0;
}

/* Estilos para la transición */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter,
.slide-leave-to

/* .slide-leave-active en <2.1.8 */
  {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave

/* .slide-enter-active en <2.1.8 */
  {
  opacity: 1;
  transform: translateX(0);
}
</style>
