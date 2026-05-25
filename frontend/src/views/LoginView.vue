<script setup>
import { ref } from 'vue';
import {authService} from "../services/auth.service.js";
import router from "../router/index.js";

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try{
    const response = await authService.login({
      email: email.value,
      password: password.value,
    });

    const { token } = response.data;

    localStorage.setItem('token', token);
    router.push('/');

  } catch(error) {
    if(error.response && error.response.status === 401){
      errorMessage.value = 'Credenciais incorretas';
    } else if (error.response && error.response.data?.message){
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
<div class="">
  <div class="">
    <form @submit.prevent="handleLogin" class="">
      <div class="">
        <label for="email">Email</label>
        <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Digite seu email"
        required>
      </div>
        
        <div class="">
          <label for="password">Senha</label>
          <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite seu senha"
          required>
        </div>

        <div v-if="errorMessage" class="">
          {{ errorMessage }}
        </div>

      <button @click="handleLogin" type="submit">
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>
  </div>
</div>
</template>