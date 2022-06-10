let HeaderIcon = document.getElementById('HeaderIcon')
let menu_button = document.getElementById('menu_button')
let menu_button_i = document.getElementById('menu_button_i')
let dropped_Down = document.getElementById('dropped_Down')
let clickables = document.getElementsByClassName('clickable')
let menuLinks = ['/get_percent', '/set_percent', 'from_number',
                 '/from_korean']

for(let i = 0; i < clickables.length; i++){
  clickables[i].addEventListener('click', () => {
    location.href = menuLinks[i]
  })
}

HeaderIcon.addEventListener('click', () => {
  location.href = '/'
})

menu_button.addEventListener('click', () => {
  dropped_Down.classList.toggle('dropped_Down_show')
  menu_button_i.classList.toggle('highlight')
})
