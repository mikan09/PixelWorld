// src/stores/useDots.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useDots = defineStore('dots', {
  // ストアの状態を定義
  state: () => ({
    // 32x32のグリッドを表現するための配列
    // 各要素はドットの色を表す
    grid: Array(32 * 32).fill('#ffffff') // 初期状態：白
  }),
  actions: {
    // ストアのアクションを定義
    async load() {
      // Supabaseからデータを取得して、グリッドを更新
      const { data } = await supabase.from('dotgrid').select('*')
      // データが存在する場合、グリッドを更新
      if (data) {
        data.forEach(({ index, color }) => {
          this.grid[index] = color
        })
      }
    },
    async update(index) {
      // 指定されたインデックスのドットの色をランダムに変更
      const color = getRandomColor()
      // グリッドの該当位置を更新
      this.grid[index] = color
      await supabase
        // Supabaseに変更を反映
        .from('dotgrid')
        .upsert({ index, color }, { onConflict: ['index'] })
    },
    subscribeToUpdates() {
      supabase
        .channel('dotgrid-updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'dotgrid'
          },
          payload => {
            console.log('Realtime payload:', payload)
            const { index, color } = payload.new
            this.grid[index] = color
          }
        )
        .subscribe()
    }

  }
})

// ランダムな色を生成するヘルパー関数
function getRandomColor() {
  // ランダムな色を生成して返す
  // 256の3乗 = 16,777,216通りからランダムに1つ選ぶ
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}