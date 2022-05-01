// var의 특성
console.log(str); // 변수 호이스팅으로 undefined가 찍힘

var str;

if(str === undefined){
    var number = 5;
}

console.log(number);


// let 의 특성
let letStr = 'test';

if(str === undefined){
    let letStr = 'gogo';

    console.log(letStr)
}

console.log(letStr)

// const의 특성
const constStr = 'constStr';

// constStr = '재할당 불가';


test(); // 함수 호이스팅 적용
//tts(); // 함수 호이스팅이 적용되지 않음

function test(){
    console.log('test');
}

var tts = function(){
    console.log('tts');
}

