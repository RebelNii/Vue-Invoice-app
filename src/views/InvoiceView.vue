<template>
  <div class="text-white px-32 py-2 h-full overflow-hidden">
    <router-link class="" :to="{ name: 'home' }">Go Home</router-link>

    <!-- Heading -->
    <div class="flex my-5 items-center w-full relative py-6 px-8">
      <div class="left flex">
        <span class="mr-5">Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: singleInvoice.invoicePaid,
            draft: singleInvoice.invoiceDraft,
            pending: singleInvoice.invoicePending,
          }"
        >
          <span
            class="rounded bg-green-500 text-sm p-1"
            v-if="singleInvoice.invoicePaid"
            >Paid</span
          >
          <span
            class="rounded bg-yellow-200 text-sm p-1"
            v-if="singleInvoice.invoiceDraft"
            >Draft</span
          >
          <span
            class="rounded bg-redshay text-sm p-1"
            v-if="singleInvoice.invoicePending"
            >Pending</span
          >
        </div>
      </div>
      <div class="right flex flex-1 justify-end gap-4">
        <button
          @click="toggleEditInvoice(singleInvoice.id)"
          class="bg-purple-800 p-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          @click="deleteInvoice(singleInvoice.id)"
          class="bg-red-800 p-1 rounded text-sm"
        >
          Delete
        </button>
        <button
          v-show="singleInvoice.invoicePending"
          @click="updateStatusToPaid(singleInvoice.id)"
          class="bg-green-500 p-1 rounded text-sm"
        >
          Mark as Paid
        </button>
        <button
          v-if="singleInvoice.invoiceDraft || singleInvoice.invoicePaid"
          @click="updateStatusToPending(singleInvoice.id)"
          class="bg-yellow-300 p-1 rounded text-sm"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice details -->
    <div class="flex flex-col bg-slate-700 rounded shadow-black shadow-sm px-5">
        <div class="top flex mb-4 ">
            <div class="left flex flex-1 flex-col">
            <p class="text-2xl uppercase mb-2">
                <span>#</span>{{ singleInvoice.id }}
            </p>
            <p>{{ singleInvoice.productDescription }}</p>
            </div>
            <div class="right flex flex-1 flex-col items-end">
                <p>{{singleInvoice.billerStreetAddress}}</p>
                <p>{{singleInvoice.billerCity}}</p>
                <p>{{singleInvoice.billerCountry}}</p>
                <p>{{singleInvoice.billerZipCode}}</p>
            </div>
        </div>
        <div class="mid flex my-5 gap-10">
        <div class="payment flex flex-col">
            <h4 class="mb-4">Invoice Date</h4>
            <p class="font-semibold">{{singleInvoice.invoiceDate}}</p>
            <h4 class="mb-4 mt-2">Payment Date</h4>
            <p class="font-semibold">{{singleInvoice.paymentDueDate}}</p>
        </div>
        <div class="bill flex flex-col">
            <h4 class="mb-4">Bill To</h4>
            <p class="text-base">{{ singleInvoice.clientName }}</p>
            <p class="text-xs mt-auto">{{ singleInvoice.clientStreetAddress }}</p>
            <p class="text-xs">{{ singleInvoice.clientCity }}</p>
            <p class="text-xs">{{ singleInvoice.clientZipCode }}</p>
            <p class="text-xs">{{ singleInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-1 flex-col ">
            <h4 class="mb-4">Sent To</h4>
            <p>{{ singleInvoice.clientEmail }}</p>
        </div>
        </div>
        <div class="bottom flex flex-col mb-4">
            <div class="billing-items px-8 bg-slate-500 rounded-t-sm ">
                <div class="heading flex">
                <p class="text-left text-sm uppercase basis-2/5">Item Name</p>
                <p class="text-right text-sm uppercase basis-1/5">QTY</p>
                <p class="text-right text-sm uppercase basis-1/5">Price</p>
                <p class="text-right text-sm uppercase basis-1/5">Total</p>
                </div>
                <div v-for="(item, index) in singleInvoice.invoiceItemList" :key="index" class="item mb-2 last:mb-0 flex">
                <p class="text-left basis-2/5 uppercase">{{ item.itemName }}</p>
                <p class="text-right basis-1/5">{{ item.itemQty }}</p>
                <p class="text-right basis-1/5">{{ item.itemPrice }}</p>
                <p class="text-right basis-1/5">{{ item.total }}</p>
                </div>
            </div>
            <div class="total flex items-center bg-slate-900 rounded-b-sm px-8">
                <p class="flex-1 text-sm uppercase">Amount Due</p>
                <p class="text-2xl flex-1 text-right">${{ singleInvoice.invoiceTotal }}</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "InvoiceView",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapActions(["getSingleInvoice",'deleteInvoice', 'updatePaidStatus', 'updatePendingStatus']), ...mapMutations(['toggle_Edit_Invoice', 'toggleInvoiceModal']),

    toggleEditInvoice(id){
        this.toggle_Edit_Invoice();
        this.toggleInvoiceModal();
    },

    updateStatusToPaid(id){
      this.updatePaidStatus({
        id:id,
        invoicePaid: true,
        invoicePending: ''
      })
    },

    updateStatusToPending(id){
      this.updatePendingStatus({
        id:id,
        invoicePaid: null,
        invoicePending: true
      })
    },

    
  },
  computed: {
    ...mapState(["singleInvoice"]),
  },
  created() {
    this.getSingleInvoice(this.$route.params.id);
  },
};
</script>
<style></style>
