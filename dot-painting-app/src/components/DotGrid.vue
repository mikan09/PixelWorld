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

  /* グリッド全体の幅を画面幅に基づいて調整 */
  width: calc(100vw - 32px); /* 画面幅から余白を引いた値を調整 */
  max-width: 500px; /* 最大幅を設定 */
  aspect-ratio: 1; /* 正方形を維持 */
  margin: 0 auto; /* 中央寄せ */
  padding: 0 16px; /* 左右に余白を追加 */
}

.cell {
  width: 100%; /* グリッド内で自動調整 */
  height: 100%; /* グリッド内で自動調整 */
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>