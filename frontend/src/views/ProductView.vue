<script setup>
import {ref, onMounted} from 'vue';
import {productService} from "../services/product.service.js";

const products = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const showModal = ref(false);

const nome = ref('');
const categoria = ref('');
const quantidade = ref('');
const custo = ref('');
const lote = ref('');
const validade = ref(Date);
const registrarProximo = ref(false);
const erros = ref({});


const subtrairEstoque = async (product, lote) => {
  try {
    erros.value[lote._id] = ''
    await productService.subtractLot(product._id, lote._id, { quantidade: 1 })
    lote.quantidade -= 1
  } catch (error) {
    erros.value[lote._id] = error.response?.data?.error || 'Erro ao subtrair estoque.'
  }
}

const aumentarEstoque = async(product, lote) => {
  try {
    erros.value[lote._id] = ''
    await productService.incrementLot(product._id, lote._id, { quantidade: 1 });
    lote.quantidade += 1;
  } catch (error) {
    erros.value[lote._id] = error.response?.data?.error || 'Erro ao incrementar estoque.'
  }
}


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
          <button @click="showModal = true"
                  class="flex items-center gap-1 bg-gray-900 text-white rounded px-3 py-3 text-sm cursor-pointer">
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
    <!-- Main  -->
    <main class="grid grid-cols-1 lg:grid-cols-4 gap-4 rounded px-6 py-3">
      <template v-for="product in products" :key="product._id">
        <div
            v-for="lote in product.lote"
            :key="lote._id"
            class="flex flex-col p-3 rounded border">
          <div class="flex justify-center rounded py-6 border border-gray-900">
            <span class="text-sm">Foto</span>
          </div>
          <div class="flex flex-col py-1">
            <span class="text-md">{{ product.nome }}</span>
            <span class="text-xs font-semibold text-gray-400">Analgésico</span>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row justify-between items-center">
              <span class="font-bold text-red-500 text-2xl">{{ product.lote[0].quantidade }}</span>
              <span class="flex items-center border border-red-500 text-red-500 bg-red-50 text-sm rounded-full px-2">{{ new Date(lote.validade).toLocaleDateString('pt-Br') }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-400 font-semibold">min 20 · {{ lote.loteProduto }}</span>
              <span
                  class="flex items-center border border-red-500 text-red-500 bg-red-50 text-sm rounded-full px-2">baixo</span>
            </div>
          </div>
          <div class="flex border border-gray-200 rounded-full h-1.5 mt-3">
            <span class="w-3/5 bg-red-500 h-1.5 rounded-full"></span>
          </div>
          <div v-if="erros[lote._id]">
            <span  class="text-red-500 text-xs text-center-mt-2">{{ erros[lote._id] }}</span>
          </div>
          <div class="flex flex-row gap-2 px-3 py-3">
            <button
                @click="aumentarEstoque(product, lote)"
                class="flex flex-1 h-11 px-3 py-1 rounded items-center justify-center border border-green-500 cursor-pointer">
              +
            </button>
            <button
                @click="subtrairEstoque(product, lote)"
                class="flex flex-1 h-11 px-3 py-1 rounded items-center justify-center border border-red-500 cursor-pointer">
              -
            </button>
          </div>
        </div>
      </template>
    </main>


    <footer></footer>
  </div>
  <div v-if="showModal" class="...overlay...">
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="flex flex-col p-4 rounded border border-gray-200 bg-white w-1/2">
        <div class="flex flex-col">
          <span>Novo Produto</span>
          <span>Cadastre o item — você pode editar mais detalhes depois.</span>
        </div>
        <div class="flex flex-col">
          <div>
            <span>Imagem</span>
          </div>
          <div class="flex flex-col">
            <label for="nome" class="p-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Nome do Produto
            </label>
            <input type="text"
                   id="nome"
                   v-model="nome"
                   placeholder="Nome do produto..."
                   required
                   class="border px-2 py-2 rounded border-gray-300">
          </div>
          <div class="flex flex-row gap-2">
            <div class="flex flex-col w-3/5">
              <label for="categoria"
                     class="p-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Categoria
              </label>
              <select name="categoria" id="categoria"
                      class="border px-2 py-2 rounded border-gray-300">
                <option disabled value="">Selecione...</option>
                <option>A</option>
              </select>
            </div>
            <div class="flex flex-col w-1/5">
              <label for="quantidade"
                     class="p-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Quantidade
              </label>
              <input type="number"
                     id="quantidade"
                     v-model="quantidade"
                     required
                     class="border px-2 py-2 rounded border-gray-300">
            </div>
            <div class="flex flex-col w-1/5">
              <label for="custo"
                     class="p-1 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Custo Unitário
              </label>
              <input type="number"
                     id="custo"
                     v-model="custo"
                     required
                     class="border px-2 py-2 rounded border-gray-300">
            </div>
          </div>
          <div class="flex flex-row gap-2">
            <span>Quantidade Inicial</span>
            <span>Custo unitário</span>
          </div>
          <div class="flex flex-row gap-2">
            <span>Lote:</span>
            <span>Validade:</span>
          </div>
          <div>
            <span>Cadastrar outro em seguida</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>