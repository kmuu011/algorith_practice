/**
 * A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.
 *
 * For example, number 9 has binary representation 1001 and contains a binary gap of length 2.
 * The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3.
 * The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps.
 * The number 32 has binary representation 100000 and has no binary gaps.
 *
 * Write a function:
 *
 * function solution(N);
 *
 * that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.
 *
 * For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5.
 * Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.
 *
 * Write an efficient algorithm for the following assumptions:
 *
 * N is an integer within the range [1..2,147,483,647].
 *
 * 두줄 요약
 * 정수를 하나 받고 그 정수의 2진값에서 1과 1사이에 가장 0이 많이 들어가있는 개수를 구하기
 * ex) 10001001 일경우 1과 1사이에 0이 3개들어간게 가장 많이드갔으니 3이 나와야함.
 * */

const number = Math.ceil(Math.random()*Math.pow(2,31));

/**
 * 내가 풀어본 풀이
 * */
function solution(N){
    let binary = N.toString(2);
    let len = 0;

    while(true){
        const end_idx = binary.substring(binary.indexOf('1')+1).indexOf('1');

        if(len < end_idx) len = end_idx;

        binary = binary.substring(end_idx+1);

        if(end_idx === -1) break;
    }

    return len;
}

/**
 * 다른 사람들의 풀이중 split을 이용한 풀이
 * */
function solution1(N){
    const binary = N.toString(2);
    const trimmed = binary.substring(0, binary.lastIndexOf('1')+1);
    return Math.max(...(trimmed.split('1').map(item => item.length)));
}

console.log(solution1(number));