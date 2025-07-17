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
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  gap: 1px;

  width: 100%;
  max-width: 90vmin;       /* 👈 画面幅に合わせた正方形 */
  aspect-ratio: 1;         /* 正方形グリッド維持 */
  margin: 0 auto;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

}

.cell {
  width: 100%; /* グリッド内で自動調整 */
  height: 100%; /* グリッド内で自動調整 */
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>