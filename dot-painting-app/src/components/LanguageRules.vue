<template>
  <div id="header">
    <h1>🎨Pixel World🌏</h1>
    <p class="rules">{{ ruleMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ruleMessage = ref('')
const lang = navigator.language || navigator.userLanguage

if (lang.startsWith('ja')) {
  ruleMessage.value =
    'Pixel World へようこそ！\n好きなマスをタップして色を置いてください。\n1ピクセル、1色、世界に一つだけのキャンバス。'
} else {
  ruleMessage.value =
    'Welcome to Pixel World!\nTap a square to leave your mark.\nOne pixel, one color, Only one global canvas.'
}
</script>

<style scoped>
#header {
  text-align: center;
  margin-bottom: 1rem;
}

.rules {
  font-size: 1em;
  line-height: 1.5;
  white-space: pre-line;
  opacity: 0.9;
  color: #ccc;
  padding: 0 1rem; /* 👈 モバイルで左右に余白 */
}

@media (prefers-color-scheme: light) {
  .rules {
    color: #444;
  }
}
</style>