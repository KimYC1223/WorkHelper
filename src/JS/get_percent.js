let total_num = document.getElementById('total_num')
let total_num_multiple = document.getElementById('total_num_multiple')
let part_num = document.getElementById('part_num')
let part_num_multiple = document.getElementById('part_num_multiple')
let resultText = document.getElementById('resultText')
let copyButton = document.getElementById('copyButton')

let calcResult = () => {
  if(total_num.value <= 0) {total_num.value = 0}
  if(part_num.value <= 0) {part_num.value = 0}

  if(total_num.value == 0) {
    resultText.value = '0';
  } else {
      var result =  (( part_num.value * part_num_multiple.value ) / ( total_num.value * total_num_multiple.value )) * 100
      resultText.value = result
  }
}

total_num.addEventListener('change',() => {calcResult()})
part_num.addEventListener('change',() => {calcResult()})
total_num_multiple.addEventListener('change',() => {calcResult()})
part_num_multiple.addEventListener('change',() => {calcResult()})

copyButton.addEventListener('click', () => {
  resultText.select()
  document.execCommand('copy')
})
