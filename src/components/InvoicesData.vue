<template>
  <router-link
    class="flex justify-center items-center transition-all"
    :to="{ name: 'invoice', params: { id: invoice.id } }"
  >
    <div class="flex justify-center items-center gap-10 w-80 md:w-700 cursor-pointer mb-10 rounded py-5 px-8 bg-slate-700 shadow-black shadow-sm">
      <div class="left flex basis-3/5 justify-center items-center">
        <span class="flex-1 uppercase">#{{ invoice.id }}</span>
        <span class="flex-1">{{ invoice.paymentDueDate }}</span>
        <span class="flex-1">{{ invoice.clientName }}</span>
      </div>
      <div class="right flex justify-center items-center gap-10">
        <span class="flex-1 text-base">${{ invoice.invoiceTotal }}</span>
        <div
          class="status-button flex"
          :class="{
            paid: invoice.invoicePaid,
            draft: invoice.invoiceDraft,
            pending: invoice.invoicePending,
          }"
        >
          <span class="rounded bg-green-500 text-sm p-1" v-if="invoice.invoicePaid">Paid</span>
          <span class="rounded bg-yellow-200 text-sm p-1" v-if="invoice.invoiceDraft">Draft</span>
          <span class="rounded bg-redshay text-sm p-1" v-if="invoice.invoicePending">Pending</span>
        </div>
        <div class="next">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "invoiceData",
  props: ["invoice"],
  components: {},
};
</script>
<style></style>
