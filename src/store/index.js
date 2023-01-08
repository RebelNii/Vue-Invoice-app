import { createStore } from "vuex";
import router from "@/router";

import axios from 'axios';

export default createStore({
  state: {
    InvoiceModal: null,
    Invoices: [],
    modal: null,
    singleInvoice: null,
    editInvoice: null
  },
  getters: {},
  mutations: {
    toggleInvoiceModal(state){
      state.InvoiceModal = !state.InvoiceModal
    },

    toggleModal(state){
      state.modal = !state.modal
    },

    toggle_Edit_Invoice(state){
      state.editInvoice = !state.editInvoice
    },

    toggleEditInvoiceState(state){
      state.editInvoice = null;
    },

    setInvoices(state, payload){
      state.Invoices.push(payload)
      state.Invoices.sort()
      console.log(state.Invoices)
    },

    clearInvoiceArray(state){
      state.Invoices = []
    },

    setSingleInvoice(state,payload){
      state.singleInvoice = payload
    },

    deleteInvoice(state,id){
      state.Invoices = state.Invoices.filter((invoice) => invoice.id != id)
    }
  },
  actions: {
    async getInvoices({commit}){
      const {data} = await axios.get('http://127.0.0.1:8000/api/v1/invoices/')
      // console.log(data)
      commit('clearInvoiceArray')
      commit('toggleEditInvoiceState')
      data.data.forEach((element) => {
        commit('setInvoices', element)
      });
      // commit('setInvoices', data.data)
    },

    async getSingleInvoice({commit},id){
      const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/invoice/${id}`)
      console.log(data.data)
      commit('setSingleInvoice', data.data)
    },

    async deleteInvoice({commit}, id){
      const {data} = await axios.delete(`http://127.0.0.1:8000/api/v1/invoice/${id}`)
      console.log(data)
      commit('deleteInvoice',id)
      router.push('/')
    },

    async updatePaidStatus({commit},{id,invoicePaid,invoicePending}){
      const {data} = await axios.put(`http://127.0.0.1:8000/api/v1/invoiced/${id}`,{invoicePaid,invoicePending})
      console.log(data)
      router.push('/')
    },

    async updatePendingStatus({commit},{id,invoicePaid,invoicePending}){
      const {data} = await axios.put(`http://127.0.0.1:8000/api/v1/invoicedd/${id}`,{invoicePaid,invoicePending})
      console.log(data)
      router.push('/')
    },
  },
  modules: {},
});
