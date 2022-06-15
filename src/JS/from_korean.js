let total_num = document.getElementById('total_num')
let result_num = document.getElementById('result_num')
let result_num_multiple = document.getElementById('result_num_multiple')
let roundText = document.getElementById('roundText')
let copyButton = document.getElementById('copyButton')
let c1 = document.getElementById('c1')

let radio = document.getElementsByName('group1')
let radioValue = 'number'
let result_value = 0

var dictObject = {}
dictObject['일'] = 1
dictObject['이'] = 2
dictObject['삼'] = 3
dictObject['사'] = 4
dictObject['오'] = 5
dictObject['육'] = 6
dictObject['칠'] = 7
dictObject['팔'] = 8
dictObject['구'] = 9

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

  if( result_value == -1) {
    result_num.value = '입력 형식 오류'
  } else if(radioValue == 'number') {
    roundText.classList.add('hidden')
    if(isComma) {
      if(radioValue == 'number') {
        if(isFloat(result_value)) {
          var str = result_value.toString()
          str = str.split('.')
          result_num.value = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' +  str[1]
        }
        else result_num.value = result_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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


let changeToNum = (str) => {
  var tempResult = -1

  const regExp1 = /십/
  const regExp2 = /백/

  try {
    var chun = 0; var back = 0; var ship = 0; var il = 0;
    var chun_arr = str.split(/천/g)
    var back_arr = str.split(/백/g)
    var ship_arr = str.split(/십/g)
    var il_arr = str.split(/[천백십]/g)

    if(chun_arr.length < 2) { chun = 0}
    else if(chun_arr.length > 2) {chun = -1}
    else {
      if(regExp1.test(chun_arr[0]) || regExp2.test(chun_arr[0]))
        chun = -1;
      else {
        if(chun_arr[0] == '') chun = 1
        else chun = Number(chun_arr[0])
        if(isNaN(chun) || chun.toString().length > 1 || chun < 0 || isFloat(chun))
          chun = dictObject[chun_arr[0]]
        if( isNaN(ship) )
          chun = -1
      }
    }

    if(back_arr.length < 2) { back = 0 }
    else if(back_arr.length > 2) { back = -1; }
    else {
      var temp = back_arr[0].split(/[천백십]/)

      if(regExp1.test(back_arr[0])) {
        back = -1
      } else {
        if('' == temp[temp.length-1]) back = 1
        else back = Number(temp[temp.length-1])
        if( isNaN(back) || back.toString().length > 1 || back < 0 || isFloat(back))
          back = dictObject[temp[temp.length-1]]
        if( isNaN(ship) )
          back = -1
      }
    }

    if(ship_arr.length < 2) { ship = 0}
    else if(ship_arr.length > 2) {ship = -1}
    else {
      var temp = ship_arr[0].split(/[천백십]/)
      if('' == temp[temp.length-1]) ship = 1
      else ship = Number(temp[temp.length-1])
      if( isNaN(ship) || ship.toString().length > 1 || ship < 0 || isFloat(ship))
        ship = dictObject[temp[temp.length-1]]
      if( isNaN(ship) )
        ship = -1
    }

    if(il_arr[il_arr.length-1] == '') { il = 0 }
    else {
      il = Number(il_arr[il_arr.length-1])
      if( isNaN(il) || il.toString().length > 1 || il < 0 || isFloat(il))
        il = dictObject[il_arr[il_arr.length-1]]
      if( isNaN(il) )
        il = -1
    }

    if(chun == -1 || back == -1 || ship == -1 || il == -1)
      return -1
    else tempResult = (chun * 1000) + (back * 100) + (ship * 10) + il
  } catch(err) {
    console.log(err)
    tempResult = -1
  }

  return tempResult
}

let calcResult = () => {
  if(total_num.value <= 0) {total_num.value = 0}
  var result = total_num.value.replace(/\,/g,'')
  result = result.replace(/ /g,"")
  result = result.replace('원',"")
  result = result.replace(/^\s*|\s*$/g, '')
  if(result == '' || isNaN(result)) {
    const regExp1 = /만/
    const regExp2 = /억/

    try {
      var jo = 0; var uk = 0; var man = 0; var il = 0;
      var jo_arr = result.split(/조/g)
      var uk_arr = result.split(/억/g)
      var man_arr = result.split(/만/g)
      var il_arr = result.split(/[조억만]/g)

      if(jo_arr.length < 2) { jo = 0}
      else if(jo_arr.length > 2) {jo = -1}
      else {
        if(regExp1.test(jo_arr[0]) || regExp2.test(jo_arr[0]))
          jo = -1;
        else {
          jo = Number(jo_arr[0])
          if( isNaN(jo) )
            jo = changeToNum(jo_arr[0])
          else if( jo.toString().length > 4 || jo < 0 || isFloat(jo))
            jo = -1
        }
      }

      if(uk_arr.length < 2) { uk = 0 }
      else if(uk_arr.length > 2) { uk = -1; }
      else {
        var temp = uk_arr[0].split(/[조억만]/)

        if(regExp1.test(uk_arr[0])) {
          uk = -1
        } else {
          uk = Number(temp[temp.length-1])

          if( isNaN(uk))
            uk = changeToNum(temp[temp.length-1])
          else if( uk.toString().length > 4 || uk < 0 || isFloat(uk))
            uk = -1
        }
      }

      if(man_arr.length < 2) { man = 0}
      else if(man_arr.length > 2) {man = -1}
      else {
        var temp = man_arr[0].split(/[조억만]/)
        man = Number(temp[temp.length-1])
        if( isNaN(man) || man.toString().length > 4 || man < 0 || isFloat(man))
          { man = changeToNum(temp[temp.length-1]) }
      }

      if(il_arr[il_arr.length-1] == '') { il = 0 }
      else {
        il = Number(il_arr[il_arr.length-1])
        if( isNaN(il) || il.toString().length > 4 || il < 0 || isFloat(il))
          { il = changeToNum(il_arr[il_arr.length-1]) }
      }

      if(jo == -1 || uk == -1 || man == -1 || il == -1)
        result_value =  -1
      else  {
        result_value = (jo * 1000000000000) + (uk * 100000000) + (man * 10000) + il
        result_value = result_value / result_num_multiple.value
      }

    } catch(err) {
      result_value = -1
    }

  } else {
      result_value = result / result_num_multiple.value
  }
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
