// src/stores/useDots.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useDots = defineStore('dots', {
  // ストアの状態を定義
  state: () => ({
    // 16x16のグリッドを表現するための配列
    // 各要素はドットの色を表す
    grid: Array(16 * 16).fill('#ffffff') // 初期状態：白
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
      // const color = getRandomColor()
      const color = getRandomCssHexColor()
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

const CSS_COLOR_HEX = [
  "#f0f8ff", "#faebd7", "#00ffff", "#7fffd4", "#f0ffff",
  "#f5f5dc", "#ffe4c4", "#000000", "#ffebcd", "#0000ff",
  "#8a2be2", "#a52a2a", "#deb887", "#5f9ea0", "#7fff00",
  "#d2691e", "#ff7f50", "#6495ed", "#fff8dc", "#dc143c",
  "#00ffff", "#00008b", "#008b8b", "#b8860b", "#a9a9a9",
  "#006400", "#bdb76b", "#8b008b", "#556b2f", "#ff8c00",
  "#9932cc", "#8b0000", "#e9967a", "#8fbc8f", "#483d8b",
  "#2f4f4f", "#00ced1", "#9400d3", "#ff1493", "#00bfff",
  "#696969", "#1e90ff", "#b22222", "#fffaf0", "#228b22",
  "#ff00ff", "#dcdcdc", "#f8f8ff", "#ffd700", "#daa520",
  "#808080", "#008000", "#adff2f", "#f0fff0", "#ff69b4",
  "#cd5c5c", "#4b0082", "#fffff0", "#f0e68c", "#e6e6fa",
  "#fff0f5", "#7cfc00", "#fffacd", "#add8e6", "#f08080",
  "#e0ffff", "#fafad2", "#d3d3d3", "#90ee90", "#ffb6c1",
  "#ffa07a", "#20b2aa", "#87cefa", "#778899", "#b0c4de",
  "#ffffe0", "#00ff00", "#32cd32", "#faf0e6", "#ff00ff",
  "#800000", "#66cdaa", "#0000cd", "#ba55d3", "#9370db",
  "#3cb371", "#7b68ee", "#00fa9a", "#48d1cc", "#c71585",
  "#191970", "#f5fffa", "#ffe4e1", "#ffe4b5", "#ffdead",
  "#000080", "#fdf5e6", "#808000", "#6b8e23", "#ffa500",
  "#ff4500", "#da70d6", "#eee8aa", "#98fb98", "#afeeee",
  "#db7093", "#ffefd5", "#ffdab9", "#cd853f", "#ffc0cb",
  "#dda0dd", "#b0e0e6", "#800080", "#663399", "#ff0000",
  "#bc8f8f", "#4169e1", "#8b4513", "#fa8072", "#f4a460",
  "#2e8b57", "#fff5ee", "#a0522d", "#c0c0c0", "#87ceeb",
  "#6a5acd", "#708090", "#fffafa", "#00ff7f", "#4682b4",
  "#d2b48c", "#008080", "#d8bfd8", "#ff6347", "#40e0d0",
  "#ee82ee", "#f5deb3", "#ffffff", "#f5f5f5", "#ffff00",
  "#9acd32"
]

function getRandomCssHexColor() {
  const index = Math.floor(Math.random() * CSS_COLOR_HEX.length)
  return CSS_COLOR_HEX[index]
}


//　以下は検討用
// const RETRO_RGB = [
//   '#ff0000', '#00ff00', '#0000ff',
//   '#ffff00', '#ff00ff', '#00ffff',
//   '#000000', '#ffffff'
// ]

// function getRandomColorFromRetroRGB() {
//   return RETRO_RGB[Math.floor(Math.random() * RETRO_RGB.length)]
// }


// const PASTEL_DREAM = [
//   '#ffd3b6', '#ffaaa5', '#a8e6cf',
//   '#dcedc1', '#e6ee9c', '#f8bbd0',
//   '#f0f4c3', '#c5cae9'
// ]

// function getRandomColorFromPastelDream() {
//   return PASTEL_DREAM[Math.floor(Math.random() * PASTEL_DREAM.length)]
// }

// const CYBER_GLOW = [
//   '#00ffd5', '#ff00c8', '#fffb00',
//   '#00ff92', '#8000ff', '#ff5e00',
//   '#00e0ff', '#ff0040'
// ]

// function getRandomColorFromCyberGlow() {
//   return CYBER_GLOW[Math.floor(Math.random() * CYBER_GLOW.length)]
// }


// const NATURE_WORLD = [
//   '#228b22', '#8b4513', '#87ceeb',
//   '#f4a460', '#556b2f', '#6b8e23',
//   '#20b2aa', '#f5f5dc'
// ]

// function getRandomColorFromNatureWorld() {
//   return NATURE_WORLD[Math.floor(Math.random() * NATURE_WORLD.length)]
// }