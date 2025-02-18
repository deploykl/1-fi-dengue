<template>
  <div class="container mt-4">
    <div class="card">
      <!-- Encabezado principal -->
      <div class="card-header bg-primary text-white mb-3">
        Datos de Monitoreo
      </div>
      <div class="card-body">
        <form @submit.prevent="ADD">
          <!-- Primera fila -->
          <div class="container">
            <!-- Primer título: Monitor -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>Monitor</strong></h3>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="user" class="form-label"><strong>Usuario:</strong></label>
                <v-select v-model="usuario" :options="filteredUsuariosAPI" label="username"
                  placeholder="Escriba para buscar un usuario" :filterable="false" :searchable="true" required
                  @search="BuscarUSUARIO" :no-options-text="'No hay opciones disponibles'" />
                <input type="hidden" v-model="usuario.username" name="user" />
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
              <div class="col-md-12 col-sm-12">
                <v-select v-model="establecimientos" :options="filteredIpressAPI" label="establecimiento"
                  placeholder="Escriba un establecimiento" :filterable="false" :searchable="true" required
                  @search="BuscarIPRESS" :no-options-text="'No hay opciones disponibles'" />
                <input type="hidden" v-model="establecimiento" name="establecimiento" />
              </div>
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
                <select id="horario_atencion" name="horario_atencion" class="form-select" v-model="horario_atencion">
                  <option value="12horas">12 horas</option>
                  <option value="24horas">24 horas</option>
                </select>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md-5 col-sm-12">
                <h5 class="form-label text-center fw-bold text-dark">ITEMS</h5>
              </div>
              <div class="col-md-2 col-sm-12">
                <h5 class="form-label text-center fw-bold text-dark">OPCIONES</h5>
              </div>
              <div class="col-md-5 col-sm-12">
                <h5 class="form-label text-center fw-bold text-dark">OBSERVACIONES</h5>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <h3><strong>ORGANIZACIÓN DE LA ATENCIÓN DEL ESTABLECIMIENTO DE SALUD: ASPECTOS GENERALES</strong></h3>
                <hr style="border: 2px solid purple;">
              </div>

              <div class="row" v-for="(pregunta, index) in preguntas" :key="index">
                <div class="col-md-6 col-sm-12">
                  <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
                </div>
                <div class="col-md-2 col-sm-12">
                  <select v-model="pregunta.opcion" class="form-select" required>
                    <option value="" disabled selected>Seleccione opción</option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                    <option value="NO APLICA">NO APLICA</option>
                  </select>
                </div>
                <div class="col-md-4 col-sm-12">
                  <textarea class="form-control" v-model="pregunta.observacion"></textarea>
                </div>
              </div>
              <hr>
            </div>
          </div>

          <!-- Sección Área de Admisión / Área de Triaje -->
          <div class="row">
            <div class="col-md-12">
              <h3><strong>ÁREA DE ADMISIÓN/ÁREA DE TRIAJE</strong></h3>
              <hr style="border: 2px solid yellow;">
            </div>

            <div class="row" v-for="(pregunta, index) in preguntasTriajeNuevas" :key="index">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
          </div>

          <!-- Sección Área de Admisión / Área de Triaje -->
          <div class="row">
            <div class="col-md-12">
              <h3><strong>AMBIENTE DE TOPICO DE ATENCIÓN Y/O OBSERVACION</strong></h3>
              <hr style="border: 2px solid green;">
            </div>

            <div class="row" v-for="(pregunta, index) in preguntasAmbiente" :key="index">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
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

const usuario = ref("");
const user = ref(null);     // El valor que se pasará al input oculto

const nombre = ref("");
const email = ref("");
const fecha_subida = ref("");
const horario_atencion = ref("");

const establecimientos = ref("");
const establecimiento = ref(null);
const categoria = ref("");
const codigo = ref("");
const disa = ref("");


const preguntas = ref([
  { pregunta: 'El Jefe del E.S organiza sus servicios de salud para ver los casos de dengue y cuenta con plan de contingencia o respuesta para dengue.', opcion: '', observacion: '' },
  { pregunta: 'El E.S tiene actualizado y publicado en un lugar visible el flujo de atención de salud para dengue, además de cartera de servicios salud, horarios de atención, rol de programacion de turnos de personal de salud, mapa de flujo de referencia, mapa de actores sociales. NTS N° 037-MINSA/OGDN-V.01. (Flyer relacionado a Dengue).', opcion: '', observacion: '' },
  { pregunta: 'Frente a una situación de brote o epidemia por dengue el establecimiento de salud sin internamiento implementa un horario de atención maximo de 12 horas de la Unidad de observación para pacientes febriles de dengue para el diagnóstico y tratamiento inicial de los casos de dengue sin signos de alarma, con factores asociados o con signos de alarma.', opcion: '', observacion: '' },
  { pregunta: 'El personal de salud cumple las precauciones estándar en bioseguridad durante la atención de pacientes con Dengue (Higiene de manos, uso de EPP, limpieza y desinfección de ambientes, limpieza, desinfección y esterilización de materiales y equipos, aislamiento de pacientes, manejo de residuos sólidos y salud ocupacional) Monitorear el cumplimiento de las precauciones estándar (higiene de manos, uso correcto del equipo de protección personal - EPP, ventilación e iluminación de ambientes, desinfección de superficies y eliminación de desechos) en los E.S y SMA durante la atención de los casos. ', opcion: '', observacion: '' },
  { pregunta: 'El E.S. registra y mantiene actualizado la disponibilidad de camas en los aplicativos establecidos por MINSA.', opcion: '', observacion: '' },
  // Puedes agregar más preguntas aquí
])

const preguntasTriajeNuevas = ref([
  { pregunta: 'Cuenta con espacio fisico implementado según la Norma Técnica N° 113-MINSA/DGIEM-V.01, para el área de triaje. (0.80 M2/ persona).', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con equipos biomedicos mínimos para toma correcta de funciones vitales (Tensiometros aneroide adulto y pediatrico, estetoscopios adulto y pediatrico, balanzas adulto y pediatrico, termometros, oximetro de pulso, entre otros), según NTS N°211-DGIESP/MINSA-2024. pagina: 16', opcion: '', observacion: '' },
  { pregunta: 'El personal responsable de triaje registra las funciones vitales correctamente en la H.C. ', opcion: '', observacion: '' },
  { pregunta: 'El personal de salud ha sido capacitado para identificar oportunamente los casos probables de dengue, identifica las fases de dengue y determinar la PRIORIDAD de atención del paciente, según lo establece la NTS N° 211-DGIESP/MINSA -2024 -Dengue.Del total del personal de salud del E.S. ¿Qué porcentaje recibió capacitación? (verificar porcentaje) ¿Cómo se define el caso probable de dengue?, ¿Cuantas fases tiene el dengue?, ¿En qué fase se encuentra?, ¿Cuáles son los signos de alarma?, y otros).', opcion: '', observacion: '' },
  // Agrega más preguntas según sea necesario
]);

const preguntasAmbiente = ref([
{ pregunta: 'Cuenta con espacio físico acondicionado..', opcion: '', observacion: '' },
{ pregunta: 'Se realiza: la toma de funciones vitales, detección de casos, diagnóstico clínico e inicio de tratamiento de pacientes con Dengue sin signos de alarma (PLAN A), y para pacientes con comorbilidad o factor de riesgo como gestante, niño, anciano y casos con signos de alarma que requieran observación inicial e inicio de VEV (PLAN B1 o B2). (Utiliza Hoja de monitoreo de pacientes con Dengue) Ver Anexo 1', opcion: '', observacion: '' },
{ pregunta: 'Cuenta con médico, enfermera u otro profesional de la salud capacitado que realiza la atención de salud de manera continua las 12 o 24 horas (Depende del horario de atención).', opcion: '', observacion: '' },
{ pregunta: 'Cuenta con capacidad mínima de 2 camas de observación con área mínima de 9 m² por cama, cada cama con su mosquitero.', opcion: '', observacion: '' },
{ pregunta: 'Asegura el recurso humano (personal profesional y no profesional de la salud para la atención de salud).', opcion: '', observacion: '' },
{ pregunta: 'Cuenta con equipamiento mínimo según (Anexo 2)', opcion: '', observacion: '' },
{ pregunta: 'Realiza el control de funciones vitales correctamente y apertura la hoja de monitoreo de casos ( Incluye P.A.M).', opcion: '', observacion: '' },
{ pregunta: 'Refiere los casos con Dengue (GrupoB1 y B2) que presentan signos de alarma para monitoreo permanente en la Unidad de Vigilancia Clínica (UVICLIN) o refiere a otro E.S. que cuente con UVICLIN.', opcion: '', observacion: '' },
{ pregunta: 'Asegura la intimidad del paciente con elementos divisorios ( biombo,cortina, mampara, etc)', opcion: '', observacion: '' },
{ pregunta: 'Cuenta con disponibilidad de productos farmacéuticos y dispositivos médicos  según (Anexo 3)', opcion: '', observacion: '' },
{ pregunta: 'Verifica el adecuado registro de datos en las ficha de investigación epidemiológica.', opcion: '', observacion: '' },

]);

const LISTAR = async () => {
  try {
    const [responseUsuario, responseIpress] = await Promise.all([
      api.get('user/usuario/'),
      api.get('ipress/'),
    ]);

    usuariosAPI.value = responseUsuario.data || [];  // Asegurar que siempre sea un array
    ipressAPI.value = responseIpress.data || [];  // Extrae 'results'
  } catch (error) {
    console.error('Error al obtener los datos:', error.response ? error.response.data : error.message);
  }
};


onMounted(() => {
  fecha_subida.value = obtenerFechaHoraActual();
  LISTAR();
});

const ADD = async () => {
  try {
    // Combinar las preguntas de "ÁREA DE ADMISIÓN/ÁREA DE TRIAJE" y "TRIAJE"
    const todasLasPreguntas = [
      ...preguntas.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...preguntasTriajeNuevas.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...preguntasAmbiente.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      }))
    ];

    const data = {
      user: user.value, // Aquí ya se enviará el username
      nombre: nombre.value,
      email: email.value,
      fecha_subida: fecha_subida.value,
      establecimiento: establecimiento.value, // Asegúrate de que sea una cadena
      categoria: categoria.value,
      codigo: codigo.value,
      disa: disa.value,
      horario_atencion: horario_atencion.value,
      preguntas: todasLasPreguntas, // Enviamos todas las preguntas combinadas
    };

    console.log('Datos a enviar:', data); // Verifica los datos antes de enviarlos

    // Enviar la solicitud POST a tu API
    const response = await api.post('dengue/dengue/', data);

    // Manejar la respuesta
    if (response.status === 201) { // Asegúrate de que el código de éxito sea el correcto
      SwalSuccess('Registro exitoso', 'Los datos han sido guardados correctamente.');
      // Limpiar los campos o redirigir según sea necesario
    } else {
      SwalWarning('Error', 'No se pudo guardar los datos.');
    }
  } catch (error) {
    // Capturar y mostrar el error específico
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que no está en el rango de 2xx
      console.error('Error al registrar:', error.response.data); // Muestra el mensaje de error del servidor
      SwalWarning('Error', error.response.data.message || 'Ocurrió un error al intentar guardar los datos.');
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('Error en la solicitud:', error.request);
      SwalWarning('Error', 'No se recibió respuesta del servidor.');
    } else {
      // Algo sucedió al configurar la solicitud que provocó un error
      console.error('Error:', error.message);
      SwalWarning('Error', 'Ocurrió un error inesperado.');
    }
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

watch(establecimientos, (newVal) => {
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
// Usamos un watch para actualizar el input oculto cada vez que cambia el valor de 'usuario'
watch(usuario, (newUsuario) => {
  console.log('Usuario seleccionado:', newUsuario);
  user.value = newUsuario ? newUsuario.username : null; // Asignar el username en lugar del id
});

watch(establecimientos, (newEstablecimiento) => {
  console.log('establecimiento seleccionado:', newEstablecimiento);
  establecimiento.value = newEstablecimiento ? newEstablecimiento.establecimiento : null; // Asignar el username en lugar del id
});
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

.txt-justify {
  text-align: justify;
}
</style>
