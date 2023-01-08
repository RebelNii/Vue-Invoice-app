<template>
  <div class="home h-full w-full  px-3 py-4 text-white overflow-y-scroll">
    <!-- Header -->
    <div class="header flex mb-10 px-3 items-center">
      <div class="left flex flex-col flex-1">
        <h1 class="text-xl uppercase font-medium">Invoices</h1>
        <span class="text-sm uppercase">Total Invoice : {{Invoices.length}}</span>
      </div>
      <div class="right flex flex-1 justify-end items-center">
        <div @click="toggleFilterMenu" class="filter items-center cursor-pointer relative mr-5 flex">
          <span class="font-lg pointer-events-none">Filter by status <span v-if="filteredData">{{filteredData}}</span> </span>
          <i class="fa-solid fa-arrow-down pointer-events-none  ml-3"></i>
          <ul v-show="filterMenu" class="filter-menu absolute top-6 w-32 bg-slate-600 rounded shadow-md ">
            <li @click="filterInvoices" class="cursor-pointer text-sm py-2.5 px-4.5 hover:text-stone-900 hover:bg-gray-200 transition-all">Draft</li>
            <li @click="filterInvoices" class="cursor-pointer text-sm py-2.5 px-4.5 hover:text-stone-900 hover:bg-gray-200 transition-all">Pending</li>
            <li @click="filterInvoices" class="cursor-pointer text-sm py-2.5 px-4.5 hover:text-stone-900 hover:bg-gray-200 transition-all">Paid</li>
            <li @click="filterInvoices" class="cursor-pointer text-sm py-2.5 px-4.5 hover:text-stone-900 hover:bg-gray-200 transition-all">Reset</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button cursor-pointer rounded-3xl border-none p-2 bg-yellow-300 flex">
          <div class="flex mr-3 p-2 items-center justify-center bg-white rounded-full text-black">
            <i class="fa-solid fa-circle-plus"></i>
          </div>
          <span class="font-lg">New Invoice</span>
        </div>
      </div>
    </div>

    <!-- Invoices -->
    <div class="" v-if="Invoices.length > 0">
      <Invoices v-for="(invoice, index) in filtered" :key="index" :invoice="invoice"  />
    </div>
    <div v-else class="empty flex flex-col justify-center items-center">
      <img class="w-3/4 h-3/4" src="../assets/Announce.webp" alt="">
      <h5 class="uppercase font-semibold text-xl my-4">No Invoice Displayed!!!</h5>
      <p class="uppercase">Create a New invoice.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import {mapMutations, mapActions, mapState} from 'vuex';
import Invoices from "@/components/InvoicesData.vue"

export default {
  name: "HomeView",
  components: {
    Invoices
  },
  data(){
    return{
      filterMenu: null,
      filteredData: null
    }
  },
  methods: {
    ...mapMutations(['toggleInvoiceModal',]),
    ...mapActions(['getInvoices']),
    toggleFilterMenu(){
      this.filterMenu = !this.filterMenu;
    },

    filterInvoices(e){
      if(e.target.innerText === 'Reset'){
        return this.filteredData = null
      }

      this.filteredData = e.target.innerText
    },

    newInvoice(){
      this.toggleInvoiceModal()
    }
  },
  computed:{
    ...mapState(['Invoices']),

    filtered(){
      return this.Invoices.filter((filtered) => {
        if(this.filteredData === 'Pending'){
          return filtered.invoicePending == true
        }
        if(this.filteredData === 'Paid'){
          console.log(this.filteredData)
          return filtered.invoicePaid == true
        }
        if(this.filteredData === 'Draft'){
          console.log(this.filteredData)
          return filtered.invoiceDraft == true
        }
        return filtered
      })
    },
  },
  created() {
    this.getInvoices()
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Lato:wght@300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap");

.header{
  font-family: "Lato", sans-serif;
}

/* Safari & chrome */
.home::-webkit-scrollbar {
    display: none;
}
.home{
    /* animation: hide-scroll 0.2s backwards; */
    /* Firefox */
    scrollbar-width: none;
    /* Edge */
    -ms-overflow-style: none; 
}
</style>
