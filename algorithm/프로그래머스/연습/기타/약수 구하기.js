const num = 1000000000000000;

function solution(num) {
    const list = [];

    for(let i=1 ; i<=Math.sqrt(num) ; i++){
        if(num%i === 0){
            list.push(i);

            if(num/i !== i)list.push(num/i);
        }
    }

    return list.sort((a,b) => a-b);
}

console.log(solution(num));