<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Registros de Dengue</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    <div v-else>
      <table class="table table-striped table-bordered" id="registrosTable">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Establecimiento</th>
            <th>Categoría</th>
            <th>Imágenes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, index) in registros" :key="registro.id">
            <td>{{ index + 1 }}</td>
            <td>{{ registro.nombre }}</td>
            <td>{{ registro.establecimiento }}</td>
            <td>{{ registro.categoria }}</td>
            <td>
              <div class="d-flex flex-wrap">
                <img
                  v-for="imagen in registro.imagenes"
                  :key="imagen.id"
                  :src="imagen.imagen"
                  class="img-thumbnail me-2 zoomable-img"
                  alt="Imagen de Dengue"
                  @click="verImagen(imagen.imagen)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

<!-- Modal para zoom de imagen -->
<div class="modal fade" id="imagenModal" tabindex="-1" aria-labelledby="imagenModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content bg-dark text-white border-0 shadow-lg">
      <div class="modal-header border-0">
        <h5 class="modal-title" id="imagenModalLabel">Vista previa de la imagen</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body d-flex justify-content-center align-items-center p-3">
        <img :src="imagenSeleccionada" class="img-fluid rounded shadow-lg zoomed-image" alt="Imagen ampliada">
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { api } from '@/services/auth_axios';
import $ from 'jquery';
import * as bootstrap from 'bootstrap'; // Importa Bootstrap aquí

const registros = ref([]);
const loading = ref(true);
const imagenSeleccionada = ref(null);

onMounted(async () => {
  try {
    const response = await api.get('dengue/dengue/');
    registros.value = response.data;

    await nextTick(); // Asegura que la tabla ya se renderizó antes de inicializar DataTables
    iniciarDataTable();
  } catch (error) {
    console.error('Error al obtener los registros:', error);
  } finally {
    loading.value = false;
  }
});

const iniciarDataTable = () => {
  $('#registrosTable').DataTable({
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },
  });
};

const verImagen = (url) => {
  imagenSeleccionada.value = url;
  const imagenModal = new bootstrap.Modal(document.getElementById('imagenModal'));
  imagenModal.show();
};
</script>


<style scoped>
.img-thumbnail {
  width: 80px;
  height: 80px;
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.3s;
}

.img-thumbnail:hover {
  transform: scale(1.1);
}

.zoomed-image {
  max-height: 80vh;
  object-fit: contain;
  cursor: zoom-in;
  transition: transform 0.3s ease-in-out;
}
.zoomed-image:hover {
  transform: scale(1.05);
}
.modal-content {
  background-color: #121212;
  color: white;
  border-radius: 12px;
}
.modal-header .btn-close {
  filter: invert(1);
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
