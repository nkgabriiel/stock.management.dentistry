<script setup>
import {ref} from 'vue';
import {authService} from "../services/auth.service.js";
import router from "../router/index.js";

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
    });

    const {token} = response.data;

    localStorage.setItem('token', token);
    router.push('/');

  } catch (error) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Credenciais incorretas';
    } else if (error.response && error.response.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Falha ao conectar. Tente novamente mais tarde.';
    }
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="flex h-screen w-full">
    <!-- Lado esquerdo -->
    <div class="hidden lg:flex w-1/2 bg-neutral-900 flex-col justify-between p-12">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span class="text-black font-bold text-sm">D</span>
        </div>
        <span class="text-white font-semibold text-lg">DentalEstoque</span>
      </div>

      <div>
        <h1 class="text-white text-4xl font-bold leading-tight mb-4">
          Controle simples de estoque da sua clínica.
        </h1>
        <p class="text-neutral-400 text-base mb-8">
          Acompanhe quanitdade, lote e validade de seus produtos.
        </p>
        <ul class="space-y-2">
          <li class="text-neutral-300 text-sm flex items-center gap-2">
            <span class="text-green-400">✓</span> Estoque por produto
          </li>
          <li class="text-neutral-300 text-sm flex items-center gap-2">
            <span class="text-green-400">✓</span> Alertas de vencimento
          </li>
          <li class="text-neutral-300 text-sm flex items-center gap-2">
            <span class="text-green-400">✓</span> Relatórios de consumo
          </li>
        </ul>
      </div>

      <p class="text-neutral-600 text-xs">v1.0 · feito para clínicas odontológicas</p>
    </div>

    <!-- Lado direito -->
    <div class="flex-1 flex items-center justify-center bg-white p-8">
      <div class="w-full max-w-sm">
        <h2 class="text-2xl font-bold text-neutral-900 mb-1">Entrar</h2>
        <p class="text-neutral-500 text-sm mb-8">Acesse o controle de estoque da sua clínica</p>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              E-mail
            </label>
            <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Digite seu email"
                required
                class="border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 transition">
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
              Senha
            </label>
            <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Digite sua senha"
                required
                class="border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-400 transition">
          </div>

          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
              <input type="checkbox"
                     id="rememberMe"
                     class="w-4 h-4 cursor-pointer accent-black">
              <label for="rememberMe" class="text-sm text-gray-600 cursor-pointer">
                Lembrar de mim
              </label>
            </div>
            <a href="#" class="text-sm text-gray-600 underline hover:text-black">Esqueci a senha</a>
          </div>
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>
          <button
              type="submit"
              :disabled="isLoading"
              class="bg-neutral-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition disabled:opacity-50">
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
          <p class="text-center text-sm text-neutral-500 mt-4">
            Ainda não tem conta?
            <RouterLink to="/register" class="text-neutral-900 font-semibold hover:underline">
              Cadastre-se
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>