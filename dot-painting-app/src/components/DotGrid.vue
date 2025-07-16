<template>
  <div class="grid">
    <div
      v-for="(color, index) in dots.grid"
      :key="index"
      class="cell"
      :style="{ backgroundColor: color }"
      @click="dots.update(index)"
    ></div>
  </div>
</template>

<script setup>
import { useDots } from '../stores/useDots'
import { onMounted } from 'vue'

// useDotsストアをインポートして、状態管理を行う
const dots = useDots()

// コンポーネントがマウントされたときにDBから状態を読み込み、
onMounted(() => {
  dots.load()               // DBから現在の状態を読み込む
  dots.subscribeToUpdates() // 他ユーザーの変更をリアルタイムで受信
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(32, 16px);
  grid-template-rows: repeat(32, 16px);
  gap: 1px;
}
.cell {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>