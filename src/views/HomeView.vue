<template>
  <div class="container mt-4">
    <div class="card">
      <!-- Encabezado principal -->
      <div class="card-header mb-3 text-center">
        <h2 class="section-title">
          MONITOREO SOBRE LA ORGANIZACIÓN DE LOS SERVICIOS DE SALUD EN ESTABLECIMIENTOS DEL PRIMER NIVEL DE ATENCIÓN DE
          SALUD PARA DENGUE
        </h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="ADD">
          <!-- Primera fila -->
          <div class="container">
            <div class="circle-container">
              <div class="circle" :class="{ 'circle-green': camposPendientes === 0 }">
                <span class="counter" v-if="camposPendientes > 0">{{ camposPendientes }}</span>
                <span v-else class="check">✔️</span>
              </div>
              <p class="text-danger">❗</p>
            </div>
            <!-- Primer título: Monitor -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>DATOS DEL MONITOR</strong></h3>
              </div>
              <hr>
              <div class="col-md-3 col-sm-12">
                <label for="user" class="form-label"><strong>Usuario:</strong></label>
                <v-select v-model="usuario" :options="filteredUsuariosAPI" label="username"
                  placeholder="Escriba el usuario" :filterable="false" :searchable="true" required
                  @search="BuscarUSUARIO" :no-options-text="'No hay opciones disponibles'" />
                <input type="hidden" :value="usuario ? usuario.username : ''" name="user" />
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
                <h3><strong>ESTABLECIMIENTO</strong></h3>
              </div>
              <div class="col-md-12 col-sm-12 mb-3">
                <v-select v-model="establecimientos" :options="filteredIpressAPI" label="establecimiento"
                  placeholder="Escriba un establecimiento" :filterable="false" :searchable="true" required
                  @search="BuscarIPRESS" :no-options-text="'No hay opciones disponibles'" />
                <input type="hidden" v-model="establecimiento" name="establecimiento" />
              </div>
              <div class="col-md-4 col-sm-12">
                <label for="categoria" class="form-label"><strong>Categoría:</strong></label>
                <input type="text" class="form-control" id="categoria" v-model="categoria" required readonly>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="codigo" class="form-label"><strong>Código:</strong></label>
                <input type="text" class="form-control" id="codigo" v-model="codigo" required readonly>
              </div>
              <div class="col-md-3 col-sm-12">
                <label for="disa" class="form-label"><strong>Disa/Geresa/Diris:</strong></label>
                <input type="text" class="form-control" id="disa" v-model="disa" required readonly>
              </div>
              <div class="col-md-2 col-sm-12">
                <label for="horario_atencion" class="form-label"><strong>Horario de atención:</strong></label>
                <select id="horario_atencion" name="horario_atencion" class="form-select" v-model="horario_atencion" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="12 Horas">12 horas</option>
                  <option value="24 Horas">24 horas</option>
                </select>
              </div>
            </div>
            <hr>
            <div class="row"
              style="align-items: center; border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-bottom: 10px;">
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
            <hr>

            <div class="row">
              <div class="col-md-12">
                <h3><strong>ORGANIZACIÓN DE LA ATENCIÓN DEL ESTABLECIMIENTO DE SALUD: ASPECTOS GENERALES</strong></h3>
                <hr>
              </div>
            </div>

            <div class="row bg-per" v-for="(pregunta, index) in preguntas" :key="index"
              :class="{ 'fila-completa ': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12 d-flex align-items-center">
                <p class="form-label txt-justify mb-0" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <hr>
              </div>
            </div>
            <!-- Sección Área de Admisión / Área de Triaje -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>ÁREA DE ADMISIÓN/ÁREA DE TRIAJE</strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in preguntasTriajeNuevas" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>

            <!-- Sección AMBIENTE DE TOPICO DE ATENCIÓN Y/O OBSERVACION-->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>AMBIENTE DE TOPICO DE ATENCIÓN Y/O OBSERVACIÓN</strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in preguntasAmbiente" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>

            <!-- Sección UPSS DE CONSULTA EXTERNA-->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>UPSS DE CONSULTA EXTERNA</strong></h3>
              </div>
              <hr>
            </div>
            <div class="row bg-per" v-for="(pregunta, index) in preguntasUPSS" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
            <!-- SecciónINTERNAMIENTO -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>INTERNAMIENTO</strong></h3>
              </div>
              <hr>
            </div>
            <div class="row bg-per" v-for="(pregunta, index) in preguntasInternamiento" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
            <!-- UPSS  DE LABORATORIO -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>UPSS DE LABORATORIO</strong></h3>
              </div>
              <hr>
            </div>
            <div class="row bg-per" v-for="(pregunta, index) in PreguntasUPSSLAB" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>

            <!-- UPSS FARMACIA -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>UPSS FARMACIA</strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in PreguntasUPSSFAR" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
            <!-- EXTENSION DE LA OFERTA:  AMBIENTE DE LA UNIDAD DE VIGILANCIA CLÍNICA (UVICLIN)  -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>EXTENSION DE LA OFERTA: AMBIENTE DE LA UNIDAD DE VIGILANCIA CLÍNICA (UVICLIN) </strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in PreguntasUPSSEXT" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
            <!-- EXTENSION DE LA OFERTA:  AMBIENTE DE LA UNIDAD DE VIGILANCIA CLÍNICA (UVICLIN)  -->
            <div class="row">
              <div class="col-md-12">
                <h3><strong>DE LA UNIDAD FEBRIL (UF) </strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in PreguntasFEBRIL" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12">
                <p class="form-label txt-justify" v-text="pregunta.pregunta" style="user-select: none;"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select" required>
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion"></textarea>
              </div>
            </div>
            <hr>
            <!-- REFERENCIA Y CONTRARREFERENCIA -->
            <div class="row mt-4">
              <div class="col-md-12">
                <h3><strong>REFERENCIA Y CONTRARREFERENCIA</strong></h3>
              </div>
            </div>
            <hr>
            <div class="row bg-per" v-for="(pregunta, index) in PreguntasREF" :key="index"
              :class="{ 'fila-completa': pregunta.opcion && pregunta.observacion }">
              <div class="col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
                <p class="form-label txt-justify" v-text="pregunta.pregunta"></p>
              </div>
              <div class="col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-2 mb-md-0">
                <select v-model="pregunta.opcion" class="form-select custom-select">
                  <option value="" disabled selected>Seleccione opción</option>
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>
                  <option value="NO APLICA">NO APLICA</option>
                </select>
              </div>
              <div class="col-md-4 col-sm-12 d-flex align-items-center">
                <textarea class="form-control" v-model="pregunta.observacion" placeholder=""
                  ></textarea>
              </div>
            </div>
            <hr>

            <!-- OTROS HALLAZGOS -->
            <div class="row">
              <div class="col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
                <p class="form-label ">Otros Hallazgos:</p>
              </div>
              <div class="col-md-10 col-sm-12 d-flex justify-content-center align-items-center">
                <textarea class="form-control" v-model="otrosHallazgos"></textarea>
              </div>
            </div>
            <hr>
            <!-- IMAGENES -->
            <div class="row bg-per">
              <div class="col-md-12 mb-3">
                <h3>Subir Imágenes</h3>
                <p class="text-muted">Selecciona varias imágenes para subir. Puedes previsualizarlas antes de enviar.
                </p>
              </div>

              <div class="col-md-12 col-sm-12 d-flex justify-content-center">
                <div class="col-md-6 col-sm-12">
                  <div class="input-group">
                    <input type="file" class="form-control" id="foto" multiple @change="capturarFotos" accept="image/*"
                      capture>
                    <label class="input-group-text bg-primary text-white" for="foto">Subir</label>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mt-4" v-if="imagenes.length > 0">
                <h5 class="text-secondary">Vista Previa</h5>
                <div class="d-flex flex-wrap gap-3">
                  <div v-for="(img, index) in imagenes" :key="index"
                    class="position-relative border rounded shadow-sm bg-light"
                    style="width: 160px; height: 160px; overflow: hidden;">
                    <img :src="img" class="img-fluid w-100 h-100 object-fit-cover">
                    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                      @click="eliminarFoto(index)">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <hr>
            <div class="row bg-per">
              <div class="col-md-12 col-sm-12">
                <small class="form-label txt-justify"> Fuente: <br>
                  *NTS N° 211-MINSA/DGIESP-2024, Norma Técnica de Salud para la atención interal de pacientes con dengue
                  en el Perú, aprobada por Resolución Ministerial N° 175-2024/MINSA.
                  **Protocolo Sanitario de Urgencia: "Organización de Servicios de Salud ante Epidemia de Dengue",
                  aprobada por Resolución Viceministerial N° 012-2016-SA-DVM-SP.</small>
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
import { SwalSuccess, SwalWarning, } from '@/components/SwalComponent.vue';
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
const otrosHallazgos = ref("");

const establecimientos = ref("");
const establecimiento = ref(null);
const categoria = ref("");
const codigo = ref("");
const disa = ref("");

// Estado reactivo para almacenar imágenes seleccionadas y sus vistas previas
const imagenes = ref([]);
const imagenesPreview = ref([]);
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

const preguntasUPSS = ref([
  { pregunta: 'Cuenta con equipamiento mínimo según (Anexo 2)', opcion: '', observacion: '' },
  { pregunta: 'El médico está capacitado en la detección oportuna de los casos probables de dengue, los clasifica correctamente e inicia tratamiento precoz de los casos de dengue de acuerdo a la NTS 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
  { pregunta: 'El registro de datos en la H.C. es completo, con letra legible y coloca el diagnóstico correcto del caso de dengue, asi como las indicaciones médicas son claras y precisas, de acuerdo a la NTS 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
  { pregunta: 'Los examenes de laboratorio son solicitados de acuerdo al nivel de complejidad y disponibilidad de oferta del establecimiento de salud, según lo establece la NTS 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
]);

const preguntasInternamiento = ref([
  { pregunta: 'Cuenta con equipamiento mínimo, incluyendo mosquiteros, según (Anexo 2), para las actividades de salud diarios..', opcion: '', observacion: '' },
  { pregunta: 'Realiza el registro del tratamiento médico a los pacientes con dengue, según el flujograma de atención de acuerdo de la NTS N° 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
  { pregunta: 'Registra el monitoreo del Balance Hídrico-Electrolítico y funciones vitales de acuerdo a la NTS 211-DGIESP/MINSA-2024 (VERIFICAR Agregar Anexo).', opcion: '', observacion: '' },
]);

const PreguntasUPSSLAB = ref([
  { pregunta: 'El profesional médico solicita los examenes de laboratorio para los casos de dengue acorde a las Fases de la Enfermedad, de acuerdo a la NTS 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con profesional de laboratorio (Biólogo, tecnólogo médico o técnico de laboratorio capacitado y entrenado) para el procesamiento de muestras para el diagnóstico de Dengue, según corresponda.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con insumos para las pruebas serológicas o pruebas moleculares, en el Laboratorio del E.S. - Kits de ELISA NS1 - Kits de ELISA IgM - Kits de PCR tiempo real para serotipos de Dengue', opcion: '', observacion: '' },
  { pregunta: 'El E.S. gestiona para asegurar el abastecimiento de pruebas para dengue de acuerdo a la magnitud de casos por brote de dengue, según norma vigente..', opcion: '', observacion: '' },
]);

const PreguntasUPSSFAR = ref([
  { pregunta: 'Gestiona la disponibilidad de productos farmacéuticos y dispositivos medicos según Anexo 3.', opcion: '', observacion: '' },
  { pregunta: 'Gestiona el abastecimiento de productos farmacéuticos y dispositivos médicos, de los ítems establecidos en el Anexo 3.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con insumos para las pruebas serológicas o pruebas moleculares, en el Laboratorio del E.S. - Kits de ELISA NS1 - Kits de ELISA IgM - Kits de PCR tiempo real para serotipos de Dengue', opcion: '', observacion: '' },
  { pregunta: 'Mantiene actualizado la herramienta Informática del ICI-SISMED.', opcion: '', observacion: '' },
]);

const PreguntasUPSSEXT = ref([
  { pregunta: 'Cuenta con ambiente o área cercano al tópico o servicio de emergencia.', opcion: '', observacion: '' },
  { pregunta: 'En este ambiente se realiza el monitoreo clínico continuo de pacientes con dengue con signos de alarma durante las 24 horas, asi como los del Plan B1. Hoja de monitoreo de pacientes con Dengue. (Ver Anexo 4.1- 4.2).', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con capacidad mínima de 2 camas de observación con área mínima de 9 m² por cama, cada cama con su mosquitero adecuado.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con equipamiento mínimo, según (Anexo 2).', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con personal de salud completo (médico, enfermera y técnico de enfermería) por turno para la atención continua de los pacientes las 24 horas.', opcion: '', observacion: '' },
  { pregunta: 'Refiere los casos con Dengue Grave (Grupo C) a una unidad especializada de manejo de paciente crítico, como la Unidad de Cuidados Intensivos (UCI) iniciando estabilización hemodinámica (Ver Anexo 5).', opcion: '', observacion: '' },
  { pregunta: 'Dispone las 24 horas de ambulancia para el traslado de los pacientes que presenten alguna complicación o agravamiento de la enfermedad por dengue.', opcion: '', observacion: '' },
  { pregunta: 'Registra el monitoreo del Balance Hídrico-Electrolítico y funciones vitales de acuerdo a la NTS 211-DGIESP/MINSA-2024.', opcion: '', observacion: '' },
]);

const PreguntasFEBRIL = ref([
  { pregunta: 'Cuenta con espacio físico acondicionado para diagnóstico clínico y tratamiento de pacientes con: - Grupo A (Caso de Dengue sin signos de alarma) - Grupo B1 (Caso de Dengue sin signos de alarma más afección asociada o riesgo como gestante, niño, adulto mayor)', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con la Hoja de monitoreo de pacientes con Dengue en UF. Ver Anexo 1.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con médico, enfermera u otro profesional de la salud capacitado que realiza la atención de salud de manera continua las 12 horas del día.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con capacidad mínima de 2 camas de observación, con un área de por lo menos 9 m2 por cama y cada cama con su mosquitero.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con equipamiento mínimo según Anexo 2.', opcion: '', observacion: '' },
  { pregunta: 'El personal de salud cumple las Precauciones estándar en bioseguridad durante la atención de pacientes con Dengue.- Higiene de manos- Uso de EPP- Limpieza y desinfección de ambientes- Limpieza, desinfección y esterilización de materiales y equipos - Aislamiento de pacientes- Manejo de residuos sólidos - Prevención de pinchazo de aguja y lesiones con otros instrumentos afilados ', opcion: '', observacion: '' },
  { pregunta: 'Deriva los casos con Dengue (Grupo A y Grupo B1) que presentan signos de alarma para monitoreo permanente en la Unidad de Vigilancia Clínica (UVICLIN) o refiere a otro E.S que cuente con UVICLIN.', opcion: '', observacion: '' },
  { pregunta: 'Cuenta con disponibilidad de productos farmacéuticos y dispositivos medicos según Anexo 3', opcion: '', observacion: '' },
]);

const PreguntasREF = ref([
  { pregunta: 'El establecimiento de salud cuenta con el mapa del flujo de referencia y contrareferencia definido y socializado por la Autoridad Sanitaria  publicado en un lugar visible, para la continuidad de la atención de casos con dengue.', opcion: '', observacion: '' },
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
      })),
      ...preguntasUPSS.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...preguntasInternamiento.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...PreguntasUPSSLAB.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...PreguntasUPSSFAR.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...PreguntasUPSSEXT.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...PreguntasFEBRIL.value.map(p => ({
        pregunta: p.pregunta,
        opcion: p.opcion,
        observacion: p.observacion,
      })),
      ...PreguntasREF.value.map(p => ({
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
      otrosHallazgos: otrosHallazgos.value,
      preguntas: todasLasPreguntas, // Enviamos todas las preguntas combinadas
    };

    // Crear un FormData para enviar las imágenes
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    // Agregar las imágenes al FormData
    imagenes.value.forEach((img, index) => {
      const file = dataURLtoFile(img, `imagen_${index}.png`);
      formData.append('imagenes', file);
    });



    //console.log('Datos a enviar:', data);

    // Enviar la solicitud POST a tu API
    const response = await api.post('dengue/dengue/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

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
// Función para convertir data URL a File
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Función para formatear el código a 8 dígitos
const formatCodigo = (codigo) => {
  return codigo.toString().padStart(8, '0');
};

const obtenerFechaHoraActual = () => {
  const ahora = new Date();
  const opcionesFecha = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/Lima' };
  const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Lima' };

  const fecha = new Intl.DateTimeFormat('es-PE', opcionesFecha).format(ahora).replace(/\//g, '-');
  const hora = new Intl.DateTimeFormat('es-PE', opcionesHora).format(ahora);

  return `${fecha} ${hora}`;
};

// Actualizar el valor del input cada segundo
document.addEventListener("DOMContentLoaded", function () {
  const campoFechaHora = document.getElementById("fecha_subida");

  const actualizarFechaHora = () => {
    campoFechaHora.value = obtenerFechaHoraActual();
  };

  // Llamar inmediatamente al cargar
  actualizarFechaHora();

  // Actualizar cada segundo
  setInterval(actualizarFechaHora, 1000);
});



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
watch(usuario, (newVal) => {
  if (newVal) {
    nombre.value = `${newVal.first_name} ${newVal.last_name}`;
    email.value = newVal.email;
  } else {
    nombre.value = "";
    email.value = "";
  }
});

watch(establecimientos, (newEstablecimiento) => {
  //console.log('establecimiento seleccionado:', newEstablecimiento);
  establecimiento.value = newEstablecimiento ? newEstablecimiento.establecimiento : null; // Asignar el username en lugar del id
});


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

const calcularCamposPendientes = () => {
  let pendientes = 0;

  // Verificar campos del monitor
  if (!usuario.value) pendientes++;
  if (!nombre.value) pendientes++;
  if (!email.value) pendientes++;
  if (!fecha_subida.value) pendientes++;

  // Verificar campos del establecimiento
  if (!establecimientos.value) pendientes++;
  if (!categoria.value) pendientes++;
  if (!codigo.value) pendientes++;
  if (!disa.value) pendientes++;
  if (!horario_atencion.value) pendientes++;

  // Verificar preguntas
  const todasLasPreguntas = [
    ...preguntas.value,
    ...preguntasTriajeNuevas.value,
    ...preguntasAmbiente.value,
    ...preguntasUPSS.value,
    ...preguntasInternamiento.value,
    ...PreguntasUPSSLAB.value,
    ...PreguntasUPSSFAR.value,
    ...PreguntasUPSSEXT.value,
    ...PreguntasFEBRIL.value,
    ...PreguntasREF.value
  ];

  todasLasPreguntas.forEach(pregunta => {
    if (!pregunta.opcion || !pregunta.observacion) pendientes++;
  });

  // Verificar otros hallazgos
  if (!otrosHallazgos.value) pendientes++;

  return pendientes;
};

const camposPendientes = ref(calcularCamposPendientes());

watch([usuario, nombre, email, fecha_subida, establecimientos, categoria, codigo, disa, horario_atencion, otrosHallazgos], () => {
  camposPendientes.value = calcularCamposPendientes();
});

watch([preguntas, preguntasTriajeNuevas, preguntasAmbiente, preguntasUPSS, preguntasInternamiento, PreguntasUPSSLAB, PreguntasUPSSFAR, PreguntasUPSSEXT, PreguntasFEBRIL, PreguntasREF], () => {
  camposPendientes.value = calcularCamposPendientes();
}, { deep: true });
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

.form-select {
  text-align: center;
  width: 100%;
}

.circle-container {
  position: fixed;
  top: 30%;
  left: 10px;
  text-align: center;
  z-index: 1000;
}

.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fd1e00;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.counter {
  line-height: 25px;
  /* Ajusta el line-height para que coincida con la altura del círculo */
}

.circle-green {
  background-color: #f4f5f4;
  /* Verde */
  border: 1px solid green;
}

.check {
  font-size: 20px;
  color: white;
}

h3 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.8rem;
  color: transparent;
  background: linear-gradient(90deg, #5a5f8b, #42464d);
  -webkit-background-clip: text;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(104, 104, 255, 0.5);
  animation: glow 3s infinite;
}

h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #1a146e, #2963c7);
  border-radius: 2px;
  transition: width 0.3s ease-in-out;
}

h3:hover::after {
  width: 100%;
  /* Extender el subrayado al 100% */
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid rgba(255, 255, 255, 0.7);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 25px;
  transition: transform 0.3s ease-in-out;
}

.btn-primary:hover {
  transform: scale(1.05);
  /* Efecto de escala al pasar el mouse */
}

.fila-completa {
  background-color: #e8f5e9;
  border-left: 30px solid #4caf50;
  transition: background-color 0.3s ease, border-left 0.3s ease;
  /* Transición suave */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* Sombra sutil */
}

.fila-completa:hover {
  background-color: #d4edda;
  /* Cambio de color al pasar el mouse */
  border-left: 10px solid #45a049;
  /* Borde más oscuro */
}

.bg-per {
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
