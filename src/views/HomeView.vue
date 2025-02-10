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
                <v-select v-model="usuario" :options="filteredUsuarios" label="username"
                  placeholder="Escriba para buscar un usuario" :filterable="false" :searchable="true" required
                  @search="handleSearch" :no-options-text="'No hay opciones disponibles'" />
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
                <label for="hora_atencion" class="form-label"><strong>Fecha:</strong></label>
                <input type="text" class="form-control" id="hora_atencion" v-model="hora_atencion"
                  placeholder="Fecha y hora de atención" readonly required>
              </div>
            </div>

            <hr>

            <!-- Segundo título: Establecimiento -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>Establecimiento</strong></h3>
              </div>
              <v-select v-model="ipressData" :options="filteredEstablecimientos" label="label"
                placeholder="Escriba un establecimiento" :filterable="false" :searchable="true" required
                @search="handleSearchEstablecimientos" :no-options-text="'No hay opciones disponibles'" />



              <div class="col-md-4 col-sm-12">
                <label for="categoria" class="form-label"><strong>Categoría:</strong></label>
                <input type="text" class="form-control" id="categoria" v-model="categoria"
                  placeholder="Ingrese la categoría" required>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="codigo" class="form-label"><strong>Código:</strong></label>
                <input type="text" class="form-control" id="codigo" v-model="codigo" placeholder="Ingrese el código"
                  required>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="diresa" class="form-label"><strong>Diresa/Geresa/Diris:</strong></label>
                <input type="text" class="form-control" id="diresa" placeholder="Ingrese Diresa/Geresa/Diris" required>
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="formato_hora" class="form-label"><strong>Horario de atención:</strong></label>
                <select id="formato_hora" name="formato_hora" class="form-select">
                  <option value="12horas">12 horas</option>
                  <option value="24horas">24 horas</option>
                </select>
              </div>
            </div>
            <hr>
            <!-- Ítems -->
            <div class="row">
              <div class="row">
                <div class="col-md-12">
                  <h3><strong>ORGANIZACIÓN DE LA ATENCION DEL ESTABLECIMIENTO DE SALUD: ASPECTOS GENERALES</strong></h3>
                </div>
                <hr>
                <!-- Ítem 1 -->
                <div class="row">
                  <div class="col-md-5 col-sm-12">
                    <label for="item1" class="form-label"><strong>El Jefe del E.S organiza sus servicios de
                        salud...</strong></label>
                  </div>
                  <div class="col-md-2 col-sm-12">
                    <select v-model="item1" class="form-select" required>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NO APLICA">NO APLICA</option>
                    </select>
                  </div>
                  <div class="col-md-5 col-sm-12" style="position: relative;">
                    <input type="text" class="form-control ms-2" v-model="observacionItem1"
                      @input="filtrarSugerencias('observacionItem1')" placeholder="Observaciones" required />
                    <small class="form-text text-muted">Se evidencia que si tiene plan de actividades y el responsable
                      está activo.</small>
                    <div v-if="sugerenciasPorCampo.observacionItem1.length > 0" class="sugerencias">
                      <ul>
                        <li v-for="(sugerencia, index) in sugerenciasPorCampo.observacionItem1.slice(0, 3)" :key="index"
                          @click="seleccionarSugerencia(sugerencia, 'observacionItem1')">
                          {{ sugerencia }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr>
                <!-- Ítem 2 -->
                <div class="row">
                  <div class="col-md-5 col-sm-12">
                    <label for="item2" class="form-label"><strong>El E.S tiene actualizado y publicado en un lugar
                        visible...</strong></label>
                  </div>
                  <div class="col-md-2 col-sm-12">
                    <select v-model="item2" class="form-select" required>
                      <option value="" disabled selected>Seleccione una opción</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NO APLICA">NO APLICA</option>
                    </select>
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <input type="text" class="form-control ms-2" v-model="observacionItem2"
                      @input="filtrarSugerencias('observacionItem2')" placeholder="Observaciones" required />
                    <small class="form-text text-muted">Se evidencia que está actualizado y publicado en un lugar
                      visible.</small>
                    <div v-if="sugerenciasPorCampo.observacionItem2.length > 0" class="sugerencias">
                      <ul>
                        <li v-for="(sugerencia, index) in sugerenciasPorCampo.observacionItem2.slice(0, 3)" :key="index"
                          @click="seleccionarSugerencia(sugerencia, 'observacionItem2')">
                          {{ sugerencia }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <h3><strong>ORGANIZACIÓN 2</strong></h3>
                </div>
                <hr>
                <!-- Ítem 1 -->
                <div class="row">
                  <div class="col-md-5 col-sm-12">
                    <label for="item1" class="form-label"><strong>El Jefe del E.S organiza sus servicios de
                        salud...</strong></label>
                  </div>
                  <div class="col-md-2 col-sm-12">
                    <select v-model="item2" class="form-select" required>
                      <option value="" disabled selected>Seleccione una opción</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NO APLICA">NO APLICA</option>
                    </select>
                  </div>
                  <div class="col-md-5 col-sm-12" style="position: relative;">
                    <input type="text" class="form-control ms-2" v-model="observacionItem3"
                      @input="filtrarSugerencias('observacionItem3')" placeholder="Observaciones" required />
                    <small class="form-text text-muted">Se evidencia que si tiene plan de actividades y el responsable
                      está activo.</small>
                    <div v-if="sugerenciasPorCampo.observacionItem3.length > 0" class="sugerencias">
                      <ul>
                        <li v-for="(sugerencia, index) in sugerenciasPorCampo.observacionItem3.slice(0, 3)" :key="index"
                          @click="seleccionarSugerencia(sugerencia, 'observacionItem3')">
                          {{ sugerencia }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <hr>
                <!-- Ítem 2 -->
                <div class="row">
                  <div class="col-md-5 col-sm-12">
                    <label for="item2" class="form-label"><strong>El E.S tiene actualizado y publicado en un lugar
                        visible...</strong></label>
                  </div>
                  <div class="col-md-2 col-sm-12">
                    <select v-model="item2" class="form-select" required>
                      <option value="" disabled selected>Seleccione una opción</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NO APLICA">NO APLICA</option>
                    </select>
                  </div>
                  <div class="col-md-5 col-sm-12">
                    <input type="text" class="form-control ms-2" v-model="observacionItem4"
                      @input="filtrarSugerencias('observacionItem4')" placeholder="Observaciones" required />
                    <small class="form-text text-muted">Se evidencia que está actualizado y publicado en un lugar
                      visible.</small>
                    <div v-if="sugerenciasPorCampo.observacionItem4.length > 0" class="sugerencias">
                      <ul>
                        <li v-for="(sugerencia, index) in sugerenciasPorCampo.observacionItem4.slice(0, 3)" :key="index"
                          @click="seleccionarSugerencia(sugerencia, 'observacionItem4')">
                          {{ sugerencia }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <h3><strong>Captura de Imágenes</strong></h3>
                  </div>
                  <div class="col-md-4 col-sm-12">
                    <label for="foto" class="form-label"><strong>Subir imágenes:</strong></label>
                    <input type="file" class="form-control" id="foto" multiple @change="capturarFotos" accept="image/*"
                      capture>
                  </div>
                  <div class="col-md-12 mt-3">
                    <div v-if="imagenes.length > 0">
                      <h5>Vista previa:</h5>
                      <div class="d-flex flex-wrap">
                        <div v-for="(img, index) in imagenes" :key="index" class="m-2 position-relative">
                          <img :src="img" class="img-thumbnail" width="150">
                          <button class="btn btn-danger btn-sm position-absolute top-0 end-0"
                            @click="eliminarFoto(index)">X</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
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


//okey
const usuarios = ref([]); // Declaración correcta de usuarios
const usuario = ref(''); // Variable para el campo de usuario
const filteredUsuarios = ref([]); // 🔹 ¡Asegúrate de que está definido aquí!
const nombre = ref(""); // Asegúrate de definir nombre como ref
const email = ref(""); // Asegúrate de definir nombre como ref
const ipress = ref("");
const establecimientos = ref([]);
const filteredEstablecimientos = ref([]);
const categoria = ref("");
const codigo = ref("");

// Definir las variables observación de los ítems
const observacionItem1 = ref("");
const observacionItem2 = ref("");
const observacionItem3 = ref("");
const observacionItem4 = ref("");
const observacionItem5 = ref("");
// Variable para la hora de atención
const hora_atencion = ref("");
const imagenes = ref([]); // Crear una referencia para las imágenes

// Sugerencias por campo
const sugerenciasPorCampo = ref({
  observacionItem1: [],
  observacionItem2: [],
  observacionItem3: [],
  observacionItem4: [],
  observacionItem5: []
});

// Método para filtrar sugerencias basado en el texto de la observación
const filtrarSugerencias = (campo) => {
  const texto = campo === 'observacionItem1' ? observacionItem1.value :
    campo === 'observacionItem2' ? observacionItem2.value :
      campo === 'observacionItem3' ? observacionItem3.value :
        campo === 'observacionItem4' ? observacionItem4.value :
          observacionItem5.value;

  sugerenciasPorCampo.value[campo] = obtenerSugerencias(texto);
};


// Función para obtener sugerencias (puede ser personalizada)
const obtenerSugerencias = (texto) => {
  const listaDeSugerencias = [
    "Plan de contingencia aprobado.",
    "Plan de respuesta en desarrollo.",
    "Estrategia de dengue en ejecución.",
    "Material educativo disponible.",
    "Se tiene personal capacitado."
  ];

  return listaDeSugerencias.filter(sugerencia =>
    sugerencia.toLowerCase().includes(texto.toLowerCase())
  );
};

// Método para seleccionar una sugerencia y autocompletar la observación
const seleccionarSugerencia = (sugerencia, campo) => {
  if (campo === "observacionItem1") {
    observacionItem1.value = sugerencia;
  } else if (campo === "observacionItem2") {
    observacionItem2.value = sugerencia;
  } else if (campo === "observacionItem3") {
    observacionItem3.value = sugerencia;
  } else if (campo === "observacionItem4") {
    observacionItem4.value = sugerencia;
  } else if (campo === "observacionItem5") {
    observacionItem5.value = sugerencia;
  }

  // Vaciar las sugerencias después de hacer clic
  sugerenciasPorCampo.value[campo] = [];
};

// Función para obtener la fecha y hora actual en formato adecuado
const obtenerFechaYHora = () => {
  const fecha = new Date();
  const opciones = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return fecha.toLocaleString('es-PE', opciones);
};

// Función para detectar clic fuera de las sugerencias
const handleClickOutside = (event) => {
  const sugerenciasElement = document.querySelector('.sugerencias');
  if (sugerenciasElement && !sugerenciasElement.contains(event.target)) {
    // Si el clic es fuera de las sugerencias, vaciarlas
    sugerenciasPorCampo.value.observacionItem1 = [];
    sugerenciasPorCampo.value.observacionItem2 = [];
    sugerenciasPorCampo.value.observacionItem3 = [];
    sugerenciasPorCampo.value.observacionItem4 = [];
    sugerenciasPorCampo.value.observacionItem5 = [];
  }
};

// Limpiar el listener al desmontar el componente
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

// Guardar los datos
const guardarDatos = () => {
  console.log("Datos guardados:", hora_atencion.value);
};

// Método para capturar fotos
// Método para capturar fotos
const capturarFotos = (event) => {
  const files = Array.from(event.target.files);

  // Limitar a 5 imágenes
  if (imagenes.value.length + files.length > 5) {
    alert("Solo puedes subir hasta 5 imágenes.");
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagenes.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

// Método para eliminar una foto
const eliminarFoto = (index) => {
  imagenes.value.splice(index, 1);
};

//MAIN FIRMES
// Función para obtener usuarios desde la API
const LISTAR = async () => {
  try {

    // Ejecutar todas las solicitudes en paralelo
    const [responseUsuario, responseIpress] = await Promise.all([
      api.get('user/usuario/'),
      api.get('ipress/'),
    ]);

    // Asignar los datos de las respuestas
    usuarios.value = responseUsuario.data;
    ipress.value = responseIpress.data;

    // Mapear los datos de la API para Vue Select
    establecimientos.value = ipress.value.map(ip => ({
      label: ip.establecimiento, // Esto es lo que se mostrará en el select
      value: ip.id, // Esto es el valor interno que se seleccionará
    }));
    console.log("Establecimientos procesados:"); // Verifica en consola

  } catch (error) {
    console.error('Error al obtener los datos:', error.response ? error.response.data : error.message);
  }
};


// Inicialización
onMounted(() => {
  hora_atencion.value = obtenerFechaYHora();
  LISTAR();
  document.addEventListener('mousedown', handleClickOutside);
});
// Observar cambios en el usuario seleccionado
watch(usuario, (newVal) => {
  if (newVal) {
    // Si se selecciona un usuario, actualiza el campo "nombre"
    nombre.value = `${newVal.first_name} ${newVal.last_name}`;
    email.value = `${newVal.email} `;
  } else {
    // Si no hay usuario seleccionado, limpia el campo "nombre"
    nombre.value = "";
    email.value = "";
  }
});


// Filtrar solo cuando se escribe algo
const handleSearch = (searchText) => {
  if (searchText.length > 1) {
    filteredUsuarios.value = usuarios.value
      .filter(user =>
        user.username && user.username.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 8); // Limitar a los primeros 10 resultados
  } else {
    filteredUsuarios.value = [];
  }
};

const handleSearchEstablecimientos = (searchText) => {
  if (searchText.length > 1) {
    filteredEstablecimientos.value = establecimientos.value
      .filter(ipress =>
        ipress.label && ipress.label.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 10); // Limitar a 10 resultados para evitar sobrecarga
  } else {
    filteredEstablecimientos.value = [];
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
