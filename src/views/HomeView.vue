<template>
  <div class="container mt-4">
    <div class="card">
      <!-- Encabezado principal -->
      <div class="card-header bg-primary text-white mb-3">
        Datos de Monitoreo
      </div>
      <div class="card-body">
        <form @submit.prevent="guardarDatos">
          <!-- Primera fila -->
          <div class="container">
            <!-- Primer título: Monitor -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>Monitor</strong></h3>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="usuario" class="form-label"><strong>Usuario:</strong></label>
                <v-select v-model="usuario" :options="filteredUsuariosAPI" label="username"
                  placeholder="Escriba para buscar un usuario" :filterable="false" :searchable="true" required
                  @search="BuscarUSUARIO" :no-options-text="'No hay opciones disponibles'" />
              </div>

              <div class="col-md-3 col-sm-12">
                <label for="nombre" class="form-label"><strong>Nombre:</strong></label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" placeholder="Ingrese su nombre"
                  required>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="email" class="form-label"><strong>Email:</strong></label>
                <input type="text" class="form-control" id="email" v-model="email" placeholder="Ingrese su correo"
                  required>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="fecha_subida" class="form-label"><strong>Fecha:</strong></label>
                <input type="text" class="form-control" id="fecha_subida" v-model="fecha_subida"
                  placeholder="Fecha y hora de atención" readonly required>
              </div>
            </div>
            <hr>

            <!-- Segundo título: Establecimiento -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>Establecimiento</strong></h3>
              </div>
              <v-select v-model="establecimiento" :options="filteredIpressAPI" label="establecimiento"
                placeholder="Escriba un establecimiento" :filterable="false" :searchable="true" required
                @search="BuscarIPRESS" :no-options-text="'No hay opciones disponibles'" />

              <div class="col-md-4 col-sm-12">
                <label for="categoria" class="form-label"><strong>Categoría:</strong></label>
                <input type="text" class="form-control" id="categoria" v-model="categoria" readonly>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="codigo" class="form-label"><strong>Código:</strong></label>
                <input type="text" class="form-control" id="codigo" v-model="codigo" readonly>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="disa" class="form-label"><strong>disa/Geresa/Diris:</strong></label>
                <input type="text" class="form-control" id="disa" v-model="disa" readonly>
              </div>
              <div class="col-md-2 col-sm-12">
                <label for="horario_atencion" class="form-label"><strong>Horario de atención:</strong></label>
                <select id="horario_atencion" name="horario_atencion" class="form-select">
                  <option value="12horas">12 horas</option>
                  <option value="24horas">24 horas</option>
                </select>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md-12">
                <ul class="list-group">
                  <li v-for="punto in puntosAPI" :key="punto.id" class="list-group-item">
                    <h3>{{ punto.nombre }}</h3>
                    <div v-if="punto.items.length > 0">
                      <div v-for="item in punto.items" :key="item.id" class="mb-3">
                        <div class="row">
                          <div class="col-md-4 col-sm-12">
                            <p>{{ item.pregunta }}</p>
                          </div>
                          <div class="col-md-4 col-sm-12">
                            <label class="form-label"><strong>Opciones</strong></label>
                            <select v-model="item.opciones" class="form-select">
                              <option :value="true">Sí</option>
                              <option :value="false">No</option>
                            </select>
                          </div>
                          <div class="col-md-4 col-sm-12">
                            <label class="form-label"><strong>Observaciones</strong></label>
                            <small>{{ item.indicaciones }}</small>
                            <input type="text" v-model="item.observaciones" class="form-control" />
                          </div>
                        </div>
                        <hr>
                      </div>
                    </div>
                    <div v-else>
                      <p>No hay preguntas registradas para este punto.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <hr>

          </div>
          <!-- Botón de guardar -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { api, getAuthToken } from '@/services/auth_axios';
import * as bootstrap from 'bootstrap';
import { SwalSuccess, SwalWarning, SwalDelete, SwalUpdate } from '@/components/SwalComponent.vue';
import VSelect from 'vue-select';
import _ from "lodash";


const usuariosAPI = ref([]); // Declaración correcta de usuariosAPI
const ipressAPI = ref([]); // Declaración correcta 
const filteredUsuariosAPI = ref([]); // 🔹 ¡Asegúrate de que está definido aquí!
const filteredIpressAPI = ref([]); // 🔹 ¡Asegúrate de que está definido aquí!
const puntosAPI = ref([]); // 🔹 ¡Asegúrate de que está definido aquí!


const usuario = ref(null);
const nombre = ref("");
const email = ref("");
const fecha_subida = ref(""); 
const horario_atencion = ref(""); 

const establecimiento = ref(null);
const categoria = ref("");
const codigo = ref("");
const disa = ref("");


const LISTAR = async () => {
  try {
    const [responseUsuario, responseIpress, responsePuntos] = await Promise.all([
      api.get('user/usuario/'),
      api.get('ipress/'),
      api.get('dengue/puntos/'),
    ]);

    usuariosAPI.value = responseUsuario.data || [];  // Asegurar que siempre sea un array
    ipressAPI.value = responseIpress.data || [];  // Extrae 'results'
    puntosAPI.value = responsePuntos.data || [];  // Extrae 'results'
  } catch (error) {
    console.error('Error al obtener los datos:', error.response ? error.response.data : error.message);
  }
};



onMounted(() => {
  fecha_subida.value = obtenerFechaHoraActual();
  LISTAR();
});

const guardarDatos = async () => {
  try {
    // Creando los datos de Dengue
    const dengueData = {
      nombre: nombre.value,
      user: usuario.value.username,
      email: email.value,
      fecha_subida: fecha_subida.value,
      establecimiento: establecimiento.value.establecimiento,
      categoria: categoria.value,
      codigo: codigo.value,
      disa: disa.value,
      horario_atencion: horario_atencion.value,
    };

    // Guardamos el dengue primero para obtener su ID
    const response = await api.post('dengue/dengue/', dengueData);

    // Ahora que tenemos el ID del Dengue, creamos las respuestas
    const respuestasData = puntosAPI.value.flatMap(punto =>
      punto.items.map(item => ({
        dengue: response.data.id, // Aquí asignamos el ID del Dengue creado
        item: item.id,
        opciones: item.opciones,
        indicaciones: item.indicaciones,
        observaciones: item.observaciones,
      }))
    );

    // Guardamos las respuestas de Dengue
    await api.post('dengue/respuestaitem/', respuestasData);

    SwalSuccess('Datos guardados exitosamente');
  } catch (error) {
    console.error('Error al guardar los datos:', error.response ? error.response.data : error.message);
    SwalWarning('Error al guardar los datos');
  }
};




// Función para formatear el código a 8 dígitos
const formatCodigo = (codigo) => {
  return codigo.toString().padStart(8, '0');
};
// Función para obtener la fecha y hora actual en formato "YYYY-MM-DD HH:MM:SS"
const obtenerFechaHoraActual = () => {
  const ahora = new Date();
  return ahora.toISOString().slice(0, 19).replace("T", " "); // Formato YYYY-MM-DD HH:MM:SS
};

watch(usuario, (newVal) => {
  if (newVal) {
    nombre.value = `${newVal.first_name} ${newVal.last_name}`;
    email.value = newVal.email;
  } else {
    nombre.value = "";
    email.value = "";
  }
});

watch(establecimiento, (newVal) => {
  if (newVal) {
    categoria.value = newVal.categoria;
    codigo.value = formatCodigo(newVal.codigo); // Formatear el código aquí
    disa.value = newVal.disa;
  } else {
    categoria.value = "";
    codigo.value = "";
    disa.value = "";
  }
});

// Filtrar solo cuando se escribe algo
const BuscarUSUARIO = (searchText) => {
  if (searchText.length > 1) {
    filteredUsuariosAPI.value = usuariosAPI.value.filter(user =>
      user.username && user.username.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 8);
  } else {
    filteredUsuariosAPI.value = [];
  }
};

// Filtrar solo cuando se escribe algo
const BuscarIPRESS = (searchText) => {
  if (searchText.length > 1) {
    filteredIpressAPI.value = ipressAPI.value
      .filter(ipress =>
        ipress.establecimiento && ipress.establecimiento.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 8); // Limitar a los primeros 10 resultados
  } else {
    filteredIpressAPI.value = [];
  }
};
</script>



<style scoped>
/* Estilo para que las sugerencias se muestren como un cuadro flotante */
.img-thumbnail {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.sugerencias {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 150px;
  /* Limita la altura */
  overflow-y: auto;
  /* Agrega scroll si hay más sugerencias */
  z-index: 999;
}

.sugerencias ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sugerencias li {
  padding: 8px;
  cursor: pointer;
}

.sugerencias li:hover {
  background-color: #f0f0f0;
}
</style>
