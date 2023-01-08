<template>
  <div id="invoice" class="h-screen w-full">
    <div v-if="!mobile" class="invoice flex flex-col lg:flex-row h-full w-full">
      <div class="">
        <Nav />
      </div>
      <div id="route" class="text-center bg-slate-800 relative flex-1">
        <Modal v-if="modal"/>
        <transition name="invoice">
          <InvoiceModal v-if="InvoiceModal" />
        </transition>
        <router-view />
      </div>
    </div>
    <div v-else class="mobile bg-stone-900 h-full w-full flex justify-center flex-col items-center text-center text-white">
      <h3 class="text-2xl font-bold">Sorry</h3>
      <p class="text-lg uppercase">This application does not support Mobile Devices.</p>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/NavBar.vue";
import InvoiceModal from '@/components/InvoiceModal.vue';
import Modal from '@/components/Modal.vue';
import { mapState } from "vuex";
export default {
  name: "app",
  data(){
    return{
      mobile: null
    }
  },
  components: {
    Nav, InvoiceModal, Modal
  },
  methods: {
    checkScreenSize(){
      const width = window.innerWidth;
      if(width <= 750){
        this.mobile = true;
        console.log('there');
        return;
      }
      this.mobile= false;
    }
  },
  computed: {
    ...mapState(['InvoiceModal', 'modal'])
  },
  created(){
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap");

#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.mobile{
  font-family: "Roboto", sans-serif;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.invoice-enter-active,
.invoice-leave-active {
  transition: 1.8s ease all;
}

.invoice-enter-from,
.invoice-leave-to {
  transform: translateX(-690px);
}
</style>
