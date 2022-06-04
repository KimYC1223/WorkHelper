let item_1 = document.getElementById('item_01')
let item_2 = document.getElementById('item_02')
let item_3 = document.getElementById('item_03')

let item_4 = document.getElementById('item_04')
let item_5 = document.getElementById('item_05')
let item_6 = document.getElementById('item_06')

let item_7 = document.getElementById('item_07')
let item_8 = document.getElementById('item_08')
let item_9 = document.getElementById('item_09')

item_1.addEventListener('click', () => {
  location.href='/get_percent'
})

item_2.addEventListener('click', () => {
  location.href='/set_percent'
})

item_3.addEventListener('click', () => {
  location.href='/get_korean'
})

item_4.addEventListener('click', () => {
  location.href='/get_offset'
})
