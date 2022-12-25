const number = 100, limit = 3, power = 2;

function solution(number, limit, power) {
    const weaponList = [];

    for(let i=0 ; i<number ; i++){
        const divisor = [];

        for(let j=1 ; j<=Math.sqrt(i+1) ; j++){

            if((i+1)%j === 0) {
                divisor.push(j);
                if((i+1)/j !== j) divisor.push((i+1)/j);
            }
        }

        weaponList.push(
            divisor.length > limit ? power : divisor.length
        )
    }

    return weaponList.reduce((acc, v) => acc += v);
}

console.log(solution(number, limit, power));

/**
 * 약수 기반의 문제 제곱근으로 약수를 빠르게 구할 수 있는 방법을 사용해야 타임아웃이 안걸림
 * */
