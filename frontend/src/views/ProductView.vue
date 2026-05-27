<script setup>
import {ref, onMounted} from 'vue';
import {productService} from "../services/product.service.js";

const products = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');


const showProducts = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    onMounted(async () => {
      const response = await productService.getAll();
      products.value = response.data;
    });
  } catch (error) {
    if (error.response && error.response.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Falha interna do servidor. Tente novamente.";
    }
  } finally {
    isLoading.value = true;
  }
}
</script>

<template>
  <nav class="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">

    <div class="flex items-center gap-10">

      <div class="flex items-center gap-3">
        <div class="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-gray-900 rounded-lg">
          D
        </div>
        <span class="text-base font-bold text-gray-900">DentalEstoque</span>
      </div>

      <div class="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Painel</a>

        <a href="#" class="pb-1 text-gray-900 border-b-2 border-gray-900">Produtos</a>

        <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Validade</a>
        <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Alertas</a>
        <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Relatórios</a>
      </div>
    </div>

    <div class="flex items-center gap-6">

      <div class="relative hidden sm:block w-72">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input
            type="text"
            placeholder="Buscar produto, lote..."
            class="w-full py-2 pl-10 pr-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 placeholder-gray-400"
        />
      </div>
      <div class="flex items-center justify-center w-9 h-9 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
        DS
      </div>
    </div>
  </nav>
</template>