<template>
    <div class="modal flex justify-center items-center h-screen w-full fixed z-20">
        <div class="modal-content bg-slate-800 max-w-md p-10 rounded shadow-black shadow-sm">
            <p class="uppercase text-white text-sm font-semibold break-words">
                Are you sure you want to exit form page? Changes will not be saved!
            </p>
            <div class="action flex justify-center gap-3 mt-1">
                <button @click="closeModal" class="p-2 bg-green-400 rounded border-none">
                    Return
                </button>
                <button @click="closeInvoice" class="p-2 bg-red-400 rounded border-none">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    name: 'modalOne',
    data(){
        return{}
    },
    components:{},
    methods:{
        ...mapMutations(['toggleModal','toggleInvoiceModal']),

        closeModal(){
            this.toggleModal()
        },

        closeInvoice(){
            this.toggleInvoiceModal()
            this.toggleModal()
        }
    }
}
</script>
<style>
    
</style>