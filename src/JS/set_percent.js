let total_num = document.getElementById('total_num')
let total_num_multiple = document.getElementById('total_num_multiple')
let percentText = document.getElementById('percentText')
let result_num = document.getElementById('result_num')
let result_num_multiple = document.getElementById('result_num_multiple')
let roundText = document.getElementById('roundText')
let copyButton = document.getElementById('copyButton')
let c1 = document.getElementById('c1')

let radio = document.getElementsByName('group1')
let radioValue = 'number'
let result_value = 0

let num2string = (str, isAllKorean) => {
  var l = str.length
  var korean_index = ['','십','백','천']
  var korean_number =['영','일','이','삼','사','오','육','칠','팔','구']
  str = str.split("").reverse().join("")

  var returnStr = ''
  for(var i = l-1; i >= 0 ; i--) {
    if(str[i] != '0') {
      if(isAllKorean) { returnStr += korean_number[Number(str[i])] }
      else            { returnStr += str[i] }
      returnStr += korean_index[i]
    }
  }
  return returnStr
}

let isFloat = (n) => { return Number(n) === n && n % 1 !== 0; }

let printText = () => {
  var isComma = c1.checked
  var tooSmall = result_value < 1 && result_value > 0
  var isRounded = isFloat(result_value)
  var roundedValue = Math.round(result_value)
  var stringValue = String(roundedValue)
  stringValue = stringValue.split("").reverse().join("")

  if(radioValue == 'number') {
    roundText.classList.add('hidden')
    if(isComma) {
      if(radioValue == 'number') {
        if(isFloat(result_value)) {
          var str = result_value.toString()
          str = str.split('.')
          result_num.value = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' +  str[1]
        }
        else result_num.value = result_value
      } else {
        result_num.value = result_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
    else result_num.value = result_value
  } else {
    if(tooSmall) {
      roundText.classList.add('hidden')
      result_num.value = '값이 너무 작습니다'
    } else if(roundedValue == 0) {
      roundText.classList.add('hidden')
      if( radioValue == 'mix2' || radioValue == 'korean')
        result_num.value = '영'
      else result_num.value = '0'
    } else if(roundedValue <= 9999) {
      if(isRounded) { roundText.classList.remove('hidden') }
      else { roundText.classList.add('hidden') }
      if( radioValue == 'mix')
        result_num.value = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      else if(radioValue == 'mix2')
        result_num.value =  num2string(String(roundedValue),false)
      else
        result_num.value =  num2string(String(roundedValue),true)
    } else {
      if(isRounded) { roundText.classList.remove('hidden') }
      else { roundText.classList.add('hidden') }
      var count = Math.ceil(stringValue.length/4)
      var korean_index = ['','만 ','억 ','조 ','경 ']
      var index = count - 1;
      var resultText = ''
      for(var i = count-1; i >= 0; i--) {
        var temp_string = ''
        var isZero = true;
        for(var j = 3; j >= 0; j--) {
          var real_index = (4 * i) + j
          if(real_index >= stringValue.length) continue
          if(isZero && stringValue[real_index] == '0') continue
          isZero = false;
          temp_string += stringValue[real_index]
        }
        if( ! ( temp_string == '' || temp_string == '0' ||
                temp_string == '00' || temp_string == '000' || temp_string == '0000' ) ) {
          if(radioValue == 'mix')       {
            if(isComma) resultText += temp_string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            else        resultText += temp_string
          }
          else if(radioValue == 'mix2') resultText += num2string(temp_string,false)
          else                          resultText += num2string(temp_string,true)
          resultText += korean_index[index]
        }
        index = index - 1
      }
      result_num.value = resultText
    }
  }
}

let calcResult = () => {
  if(total_num.value <= 0) {total_num.value = 0}
  var result = (total_num.value * total_num_multiple.value * percentText.value) / 100
  result_value = result / result_num_multiple.value
  printText()
}

let radioButtonChange = () => {
  for (var i = 0 ; i < radio.length; i++)
    if(radio[i].checked)
      radioValue = radio[i].value
  printText()
}

for(let i1 = 0; i1 < radio.length; i1++){
  radio[i1].addEventListener('change', () => {
    radioButtonChange()
  })
}

total_num.addEventListener('change',() => {calcResult()})
total_num_multiple.addEventListener('change',() => {calcResult()})
percentText.addEventListener('change',() => {calcResult()})
result_num_multiple.addEventListener('change',() => {calcResult()})
c1.addEventListener('change',() => {printText()})

copyButton.addEventListener('click', () => {
  result_num.select()
  document.execCommand('copy')
})

copyButton.addEventListener('touchstart', () => {
  copyButton.classList.add('fake-active');
})

copyButton.addEventListener('touchend', () => {
  copyButton.classList.remove('fake-active');
})
