import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vue-select/dist/vue-select.css';

import 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';  

//testedczxczcxzczcxzc
import '@/assets/css/main.css'
import '@/assets/css/aside.css'
import '@/assets/js/aside.js'

import '@/assets/lib/fontawesome-v6.5.2/css/all.css'
import '@/assets/lib/fontawesome-v6.5.2/css/sharp-light.css'
import '@/assets/lib/fontawesome-v6.5.2/css/sharp-regular.css'
import '@/assets/lib/fontawesome-v6.5.2/css/sharp-solid.css'
import '@/assets/lib/fontawesome-v6.5.2/css/sharp-thin.css'

import 'datatables.net-bs5'; // DataTables + Bootstrap 5
import 'datatables.net-responsive-bs5'; // Responsive + Bootstrap 5
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';

createApp(App).use(store).use(router).mount('#app')
