const str = '(())())';

function solution(str){
    if(str[0] === ')' || str[str.length-1] === '(') return false;

    let left = 0;
    let right = 0;

    for(let s of str){
        if(s === '('){
            left++;
        }else{
            right++;
        }

        if(right > left) return false;
    }

    return left === right;
}

console.log(solution(str));