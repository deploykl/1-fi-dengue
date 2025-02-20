<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Registros de Dengue</h2>
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
      <div v-else>
        <div v-for="registro in registros" :key="registro.id" class="card mb-4">
          <div class="card-header">
            <h3>{{ registro.establecimiento || registro.nombre }}</h3>
          </div>
          <div class="card-body">
            <p><strong>Usuario:</strong> {{ registro.user }}</p>
            <p><strong>Email:</strong> {{ registro.email }}</p>
            <p><strong>Fecha de Subida:</strong> {{ registro.fecha_subida }}</p>
            <p><strong>Categoría:</strong> {{ registro.categoria }}</p>
            <p><strong>Código:</strong> {{ registro.codigo }}</p>
            <p><strong>Disa:</strong> {{ registro.disa }}</p>
            <p><strong>Horario de Atención:</strong> {{ registro.horario_atencion }}</p>
            <p><strong>Otros Hallazgos:</strong> {{ registro.otrosHallazgos }}</p>
  
            <h4 class="mt-4">Imágenes:</h4>
            <div class="row">
              <div v-for="imagen in registro.imagenes" :key="imagen.id" class="col-md-4 mb-3">
                <img :src="imagen.imagen" class="img-fluid rounded" alt="Imagen de Dengue">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { api } from '@/services/auth_axios';
  
  const registros = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await api.get('dengue/dengue/');
      registros.value = response.data;
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .img-fluid {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
  </style>