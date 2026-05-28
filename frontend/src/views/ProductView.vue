<script setup>
import {ref, onMounted} from 'vue';
import {productService} from "../services/product.service.js";

const products = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');


onMounted(async () => {
  isLoading.value = true
  try {
    const response = await productService.getAll()
    products.value = response.data
  } catch (error) {
    errorMessage.value = 'Falha ao carregar produtos.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
 <div>
   <!-- Barra de navegação -->
   <nav class="flex items-center justify-between px-6 py-3 sticky-top 0 border-b border-gray-200">

     <div class="flex items-center gap-10">
       <div class="flex items-center gap-3">
         <div class="flex items-center justify-center w-8 h-8">
           <span>D</span>
         </div>
         <span>DentalEstoque</span>
       </div>
       <div class="flex items-center gap-6">
         <a href="" class="">Produto</a>
         <a href="" class="">Produto</a>
         <a href="" class="">Produto</a>
         <a href="" class="">Produto</a>
         <a href="" class="">Produto</a>
       </div>
     </div>

     <div class="flex items-center gap-4">
       <div class="flex items-center border border-gray-300 rounded w-72 h-8 px-3">
         <svg class="w-4 h-4 flex-shrink-0 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round"
                 d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
         </svg>
         <input type="text"
                placeholder="Buscar produto...."
                class="flex-1 pl-3 outline-none">
       </div>
       <div class="flex items-center justify-center border border-gray-300 rounded-full h-9 w-9">
         <span class="">DS</span>
       </div>
     </div>
   </nav>

   <!-- Header -->
  <header class="flex flex-col px-6 py-3">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <span>Produtos</span>
        <span>247 itens · 8 abaixo do mínimo · 14 vencendo</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center border border-gray-300 rounded px-3 py-1 text-sm">Cards</button>
        <button class="flex items-center border border-gray-300 rounded px-3 py-1 text-sm">Tabela</button>
        <button class="flex items-center gap-1 bg-gray-900 text-white rounded px-3 py-3 text-sm">
          + Novo produto
        </button>
      </div>
    </div>
    <div class="flex justify-between pt-4">
      <div class="flex gap-2">
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Todos (247)</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Anestésicos</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">EPI</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Todos (247)</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Todos (247)</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Todos (247)</span>
        <span class="flex items-center px-2 rounded-full border border-gray-400 text-sm">Todos (247)</span>
      </div>
      <div class="flex gap-2">
        <span class="flex rounded-full items-center px-2 border border-yellow-400">↓ Abaixo do mínimo (8)</span>
        <span class="flex rounded-full items-center px-2 border border-yellow-400">↓ Abaixo do mínimo (8)</span>
      </div>
    </div>
  </header>

  <main class="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded px-6 py-3">
    <div
        v-for="product in products"
        :key="product._id"
        class="flex flex-col p-3 rounded border">
        <div class="flex justify-center rounded py-6 border border-gray-900">
            <span class="text-sm">Foto</span>
        </div>
      <div class="flex flex-col py-1 ">
        <span class="text-md">{{ product.nome }}</span>
        <span class="text-xs font-semibold text-gray-400">Analgésico</span>
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-red-500 text-2xl">{{ product.lote.reduce((acc, l) => acc + l.quantidade, 0) }}</span>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400 font-semibold">min 20 · tubete</span>
          <span class="flex items-center border border-red-500 text-red-500 bg-red-50 text-sm rounded-full px-2">baixo</span>
        </div>
      </div>
      <div class="flex border border-gray-200 rounded-full h-1.5 mt-3">
      <span class="w-3/5 bg-red-500 h-1.5 rounded-full"></span>
      </div>
    </div>
  </main>

   <footer>

   </footer>
 </div>
</template>