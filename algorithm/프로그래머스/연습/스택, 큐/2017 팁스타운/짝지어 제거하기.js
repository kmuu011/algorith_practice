const str = 'abbabb';

function solution (str) {
    const stack = [];

    for(const s of str){
        if(stack.length===0 || stack[stack.length-1] !== s){
            stack.push(s);
        }else{
            stack.pop();
        }
    }

    return stack.length === 0 ? 1 : 0;
}

console.log(solution(str));

/**
 * 처음엔 while과 for문으로 timeout유발함
 * */