<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap text-white flex transition-all flex-col fixed top-0 left-0 w-full h-screen overflow-y-scroll lg:left-20 z-10">
    <form @submit.prevent="submitForm" class="invoice-content relative bg-slate-700 shadow-2xl shadow-black w-700 px-6">
      <h2 v-if="!editInvoice">New Invoice</h2>
      <h2 v-else>Update Invoice</h2>

      <!-- Bill From -->
      <div class="bill flex flex-col">
        <h4 class="uppercase text-xl">Bill Form</h4>
        <div class="flex flex-col">
          <label for="billerStreetAddress">Street Address</label>
          <input class="border-none text-black focus:outline-none text-center rounded p-1" v-model="billerStreetAddress" type="text" required id="billerStreetAddress" />
        </div>
        <div class="flex flex-1 relative w-full mt-1 gap-10">
          <div class="flex flex-col justify-center items-center">
            <label for="billerCity">City</label>
            <input v-model="billerCity" type="text" class="w-full text-black p-1 text-center rounded border-none focus:outline-none" required id="billerCity" />
          </div>
          <div class="flex flex-col justify-center items-center">
            <label for="billerZipCode">ZipCode</label>
            <input v-model="billerZipCode" type="text" class="w-full text-black p-1 text-center rounded border-none focus:outline-none" required id="billerZipCode"/>
          </div>
          <div class="flex flex-col justify-center items-center">
            <label for="billerCountry">Country</label>
            <input v-model="billerCountry" type="text" class="w-full text-black p-1 text-center rounded border-none focus:outline-none" required id="billerCountry"/>
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to flex flex-col my-5">
        <h4>Bill To</h4>
        <div class="flex flex-col">
          <label for="clientName">Client Name</label>
          <input v-model="clientName" class="border-none text-black focus:outline-none text-center rounded p-1" type="text" required id="clientName" />
        </div>
        <div class="flex flex-col mt-1">
          <label for="clientEmail">Client Email</label>
          <input v-model="clientEmail" class="border-none text-black  focus:outline-none text-center rounded p-1" type="text" required id="clientEmail" />
        </div>
        <div class="flex flex-col mt-1">
          <label for="clientStreetAddress">Client Street Address</label>
          <input v-model="clientStreetAddress" class="border-none text-black  focus:outline-none text-center rounded p-1" type="text" required id="clientStreetAddress" />
        </div>
        <div class="flex flex-1 gap-10 mt-1">
          <div class="flex flex-col justify-center items-center">
            <label for="clientCity">Client City</label>
            <input v-model="clientCity" type="text" class="w-full p-1 text-center rounded text-black border-none focus:outline-none" required id="clientCity" />
          </div>
          <div class="flex flex-col justify-center items-center">
            <label for="clientZipCode">Client ZipCode</label>
            <input v-model="clientZipCode" type="text" class="w-full p-1 text-center rounded text-black border-none focus:outline-none" required id="clientZipCode" />
          </div>
          <div class="flex flex-col justify-center items-center">
            <label for="clientCountry">Client Country</label>
            <input v-model="clientCountry" type="text" class="w-full p-1 text-center rounded text-black border-none focus:outline-none" required id="clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice Details -->
      <div class="Invoice-dets flex flex-col">
        <h4>Invoice Details</h4>
        <div class="payment flex flex-1 gap-2 mt-1">
            <div class="flex flex-col">
                <label for="invoiceDate">Invoice Date</label>
                <input v-model="invoiceDate" class="border-none w-full focus:outline-none text-center rounded p-1" type="text" disabled id="invoiceDate" />
            </div>
            <div class="flex flex-col">
                <label for="paymentDueDate">Payment Due</label>
                <input v-model="paymentDueDate" class="border-none w-full focus:outline-none text-center rounded p-1" type="text" disabled id="paymentDueDate" />
            </div>
        </div>
        <div class="flex flex-col mt-1">
            <label for="paymentTerms">Payment Terms</label>
            <select v-model="paymentTerms" class="border-none text-black focus:outline-none text-center rounded p-1" required id="paymentTerms">
                <option value="30">Net 30 Days</option>
                <option value="60">Net 60 Days</option>
                <option value="90">Net 90 Days</option>
            </select>
        </div>
        <div class="flex flex-col mt-1">
            <label for="productDescription">Product Description</label>
            <input v-model="productDescription" class="border-none text-black focus:outline-none text-center rounded p-1" type="text" required id="productDescription" />
        </div>
        <div class="work-items mt-1 flex flex-col justify-center items-center">
            <h4 class="mb-3">Items</h4>
            <table class="item-list w-full rounded">
                <thead class="bg-gray-200 text-black">
                    <tr class="heading text-left flex">
                        <th class="basis-1/2">Name</th>
                        <th class="basis-1/5">QTY</th>
                        <th class="basis-1/5">Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody class="mt-1">
                    <tr class="flex relative gap-4 text-black mb-10 flex-1 w-full mt-1" v-for="(items, index) in invoiceItemList" :key="index">
                        <td><input class="w-full border-none p-1 focus:outline-none rounded" type="text" v-model="items.itemName"></td>
                        <td class="basis-1/5"><input class="w-full text-center border-none p-1 focus:outline-none rounded" type="text" v-model="items.itemQty"></td>
                        <td class="basis-1/5"><input class="w-full border-none text-center p-1 focus:outline-none rounded" type="text" v-model="items.itemPrice"></td>
                        <td class="basis-1/5 text-white">${{(items.total = items.itemQty * items.itemPrice)}}</td>
                        <i @click.prevent="deleteInvoice(items.id)" class="fa-solid fa-square-minus basis-1/4 absolute top-1 right-1 cursor-pointer text-red-500"></i>
                    </tr>
                </tbody>
            </table>
            <div @click.prevent="addNewInvoiceItem" class="flex w-full flex-1 cursor-pointer justify-center items-center bg-yellow-500 rounded btn p-1 mt-2">
                <i class="fa-solid fa-circle-plus mr-2"></i> <span>Add Item</span>
            </div>
        </div>
      </div>

      <!-- Save OR EXIT -->
      <div class="save flex justify-evenly  mt-3 mb-2">
        <div class="left">
            <button type="button" @click.prevent="closeInvoice" class="bg-red-400 rounded p-1">
                <h6>Cancel</h6>
            </button>
        </div>
        <div class="right flex gap-10">
            <button v-if="!editInvoice" type="button" @click.prevent="saveDraft" class="bg-purple-600 rounded p-1">
                <h6>Save Draft</h6>
            </button>
            <button v-if="!editInvoice" type="submit" @click="createInvoice" class="bg-green-400 rounded p-1 mr-1">
                <h6>Create Invoice</h6>
            </button>
            <button v-if="editInvoice" type="submit" @click="updateInvoice" class="bg-green-400 rounded p-1 mr-1">
                <h6>Update</h6>
            </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export default {
  name: "InvoiceModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: 'true',
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  components: {},
  methods: {
    ...mapMutations(['toggleInvoiceModal', 'toggleModal','toggle_Edit_Invoice']),

    calInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((items) => {
        this.invoiceTotal += items.total;
      });
    },

    addNewInvoiceItem(){
        console.log('invoiceItemList')
        this.invoiceItemList.push({
            id: uuidv4(),
            itemName: '',
            itemQty: '',
            itemPrice: 0,
            total: 0

        })
        console.log(this.invoiceItemList)
    },

    checkClick(e){
      if(e.target == this.$refs.invoiceWrap){
        this.toggleModal()
      }
    },

    async uploadInvoice(){
      if(this.invoiceItemList.length <= 0){
        alert('Please complete ItemList');
        return;
      }

      this.calInvoiceTotal()

      if(!this.editInvoice){
        const {data} = await axios.post("http://127.0.0.1:8000/api/v1/invoice", {
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerCountry: this.billerCountry,
          billerZipCode: this.billerZipCode,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientCountry: this.clientCountry,
          clientZipCode: this.clientZipCode,
          invoiceDate: this.invoiceDate,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: true,
          invoiceDraft: this.invoiceDraft,
          invoicePaid: null,
        })
  
        console.log(data)
  
        this.toggleInvoiceModal()

        
      }

      if(this.editInvoice){
        const {data} = await axios.put(`http://127.0.0.1:8000/api/v1/invoice/ ${this.$route.params.id}`, {
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerCountry: this.billerCountry,
          billerZipCode: this.billerZipCode,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientCountry: this.clientCountry,
          clientZipCode: this.clientZipCode,
          invoiceDate: this.invoiceDate,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: this.invoicePending,
          invoiceDraft: this.invoiceDraft,
          invoicePaid: null,
        })

        console.log(data)
  
        this.toggleInvoiceModal()
        this.$router.push('/')
      }

      this.$router.push('/')

    },

    submitForm(){
      this.uploadInvoice()
    },

    deleteInvoice(id){
        this.invoiceItemList = this.invoiceItemList.filter((list) => list.id != id)
    },

    closeInvoice(){
        this.toggleInvoiceModal();
    }
  },
  created(){
    if(!this.editInvoice){
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', this.dateOptions)
    }

    if(this.editInvoice){
      const singleInvoice = this.singleInvoice;
      this.billerStreetAddress = singleInvoice.billerStreetAddress;
      this.billerCity = singleInvoice.billerCity;
      this.billerCountry = singleInvoice.billerCountry;
      this.billerZipCode = singleInvoice.billerZipCode;
      this.clientName = singleInvoice.clientName;
      this.clientEmail = singleInvoice.clientEmail;
      this.clientStreetAddress = singleInvoice.clientStreetAddress;
      this.clientCity = singleInvoice.clientCity;
      this.clientCountry = singleInvoice.clientCountry;
      this.clientZipCode = singleInvoice.clientZipCode;
      this.invoiceDate = singleInvoice.invoiceDate;
      this.paymentTerms = singleInvoice.paymentTerms;
      this.paymentDueDate = singleInvoice.paymentDueDate;
      this.productDescription = singleInvoice.productDescription;
      this.invoiceItemList = singleInvoice.invoiceItemList;
      this.invoiceTotal = singleInvoice.invoiceTotal;
      this.invoicePending = singleInvoice.invoicePending;
      this.invoiceDraft = singleInvoice.invoiceDraft;
    }
  },
  computed: {
    ...mapState(['editInvoice','singleInvoice'])
  },
  watch: {
    paymentTerms(){
        const futureDate = new Date();
        this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
        this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions)
    }
  },
};
</script>
<style>
/* Safari & chrome */
.invoice-wrap::-webkit-scrollbar {
    display: none;
}
.invoice-wrap{
    /* animation: hide-scroll 0.2s backwards; */
    /* Firefox */
    scrollbar-width: none;
    /* Edge */
    -ms-overflow-style: none; 
}

/* @keyframes hide-scroll {
  from, to { overflow: hidden; } 
} */
</style>
