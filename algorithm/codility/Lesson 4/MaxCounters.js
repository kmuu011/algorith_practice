/**
 * You are given N counters, initially set to 0, and you have two possible operations on them:
 *
 * increase(X) − counter X is increased by 1,
 * max counter − all counters are set to the maximum value of any counter.
 * A non-empty array A of M integers is given. This array represents consecutive operations:
 *
 * if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
 * if A[K] = N + 1 then operation K is max counter.
 * For example, given integer N = 5 and array A such that:
 *
 *     A[0] = 3
 *     A[1] = 4
 *     A[2] = 4
 *     A[3] = 6
 *     A[4] = 1
 *     A[5] = 4
 *     A[6] = 4
 * the values of the counters after each consecutive operation will be:
 *
 *     (0, 0, 1, 0, 0)
 *     (0, 0, 1, 1, 0)
 *     (0, 0, 1, 2, 0)
 *     (2, 2, 2, 2, 2)
 *     (3, 2, 2, 2, 2)
 *     (3, 2, 2, 3, 2)
 *     (3, 2, 2, 4, 2)
 * The goal is to calculate the value of every counter after all operations.
 *
 * Write a function:
 *
 * function solution(N, A);
 *
 * that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.
 *
 * Result array should be returned as an array of integers.
 *
 * For example, given:
 *
 *     A[0] = 3
 *     A[1] = 4
 *     A[2] = 4
 *     A[3] = 6
 *     A[4] = 1
 *     A[5] = 4
 *     A[6] = 4
 * the function should return [3, 2, 2, 4, 2], as explained above.
 *
 * Write an efficient algorithm for the following assumptions:
 *
 * N and M are integers within the range [1..100,000];
 * each element of array A is an integer within the range [1..N + 1].
 *
 *
 * */

const list = [3,4,4,6,1,4,4];
const num = 5;

/**
 * 처음 풀었을 당시 소스 (77%)
 * */
function solution(N, A){
    const defaultList = new Array(N);

    defaultList.fill(0);

    for(let l of A){
        if(N+1 !== l){
            defaultList[l - 1]++;
        }else{
            defaultList.fill(Math.max(...defaultList));
        }
    }

    return defaultList;
}

/**
 * 다른 사람의 코드 참고후 다시 푼 소스 (100%)
 * N+1일때 리스트 전체를 초기화 해주는게 아니라
 * maxCounter 값을 계속해서 비교하며 갖고있다가 마지막에 적용하는 방식으로
 * 속도개선
 * */
function solution1(N, A){
    let defaultList = new Array(N).fill(0);
    let maxCounter = 0;
    let maxSet = 0;

    for(let l of A){
        if(N+1 !== l){
            const ind = l-1;
            defaultList[ind] = Math.max(defaultList[ind]+1, maxSet+1);
            maxCounter = Math.max(defaultList[ind], maxCounter);
        }else{
            maxSet = maxCounter
        }
    }

    defaultList = defaultList.map(v => Math.max(v, maxSet));

    return defaultList;
}

console.log(solution1(num, list));