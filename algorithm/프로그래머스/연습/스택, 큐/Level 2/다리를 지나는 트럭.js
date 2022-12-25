/***
 * 문제 설명
 * 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다.
 * 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다.
 * 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며,
 * 다리는 weight 이하까지의 무게를 견딜 수 있습니다.
 * 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.
 *
 * 예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다.
 * 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.
 *
 * 경과 시간    다리를 지난 트럭    다리를 건너는 트럭    대기 트럭
 * 0                     []                         []                 [7,4,5,6]
 * 1                     []                         [7]                [4,5,6]
 * 2                     []                         [7]                [4,5,6]
 * 3                     [7]                       [4]                 [5,6]
 * 4                     [7]                       [4,5]                [6]
 * 5                     [7,4]                     [5]                  [6]
 * 6                     [7,4,5]                   [6]                  []
 * 7                     [7,4,5]                   [6]                  []
 * 8                     [7,4,5,6]                 []                   []
 * 따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.
 *
 * solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length,
 * 다리가 견딜 수 있는 무게 weight,
 * 트럭 별 무게 truck_weights가 주어집니다.
 * 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.
 *
 * 제한 조건
 * bridge_length는 1 이상 10,000 이하입니다.
 * weight는 1 이상 10,000 이하입니다.
 * truck_weights의 길이는 1 이상 10,000 이하입니다.
 * 모든 트럭의 무게는 1 이상 weight 이하입니다.
 *
 * 입출력 예
 * bridge_length    weight    truck_weights                             return
 * 2                      10          [7,4,5,6]                                   8
 * 100                   100         [10]                                       101
 * 100                   100         [10,10,10,10,10,10,10,10,10,10]      110
 */

// const bridge_length = 100;
// const weight = 100;
// const truck_weights = [10];
const bridge_length = 2;
const weight = 10;
const truck_weights = [7,4,5,6];

// 22.04.24 완료
// 그동안 알고리즘을 풀면서 문제 제대로 안읽기, 뇌절해버리기를 모두 하지 않고
// 정상적으로 풀은 결과 무난하게 완료함
function solution(bridge_length, weight, truck_weights) {
    let second = 0;

    const pendingTruckList = truck_weights.map(v => ({
        weight: v,
        status: 0
    }));

    const truckOnBridge = [];

    while(pendingTruckList[0] || truckOnBridge[0]){
        second++;

        const truckInfo = pendingTruckList[0];

        for(let i=0 ; i<truckOnBridge.length ; i++){
            truckOnBridge[i].status++;

            if(truckOnBridge[i].status === bridge_length){
                truckOnBridge.splice(i, 1);
                i--;
            }
        }

        const weightOnBridge = truckOnBridge.reduce((w, v) => w += v.weight, 0);
        const countOnBridge = truckOnBridge.length;

        if(pendingTruckList[0] && weight >= weightOnBridge+truckInfo.weight && bridge_length >= countOnBridge+1){
            truckOnBridge.push(truckInfo);
            pendingTruckList.shift();
        }
    }

    return second;
}

// console.log(solution(bridge_length, weight, truck_weights));


// 다른 사람의 풀이
// qu.shift()로 qu의 맨앞을 뺌과 동시에 뺀값을 이용하는 부분이 인상깊음.
// time+bridge_length로 해당 트럭이 빠져나갈 시간을 미리 예측해둠
// 다음 트럭이 들어올 수 없는 하중에 도달하면 다리를 건너는 불필요한 과정을
// 생략해 속도개선을 한듯.
// 굉장히 빠름 좋은 방법인듯.
function solution1(bridge_length, weight, truck_weights) {
    // '다리'를 모방한 큐에 간단한 배열로 정리 : [트럭무게, 얘가 나갈 시간].
    let time = 0, qu = [[0, 0]], weightOnBridge = 0;

    // 대기 트럭, 다리를 건너는 트럭이 모두 0일 때 까지 다음 루프 반복
    while (qu.length > 0 || truck_weights.length > 0) {
        // 1. 현재 시간이, 큐 맨 앞의 차의 '나갈 시간'과 같다면 내보내주고,
        //    다리 위 트럭 무게 합에서 빼준다.
        if (qu[0][1] === time) weightOnBridge -= qu.shift()[0];

        if (weightOnBridge + truck_weights[0] <= weight) {
            // 2. 다리 위 트럭 무게 합 + 대기중인 트럭의 첫 무게가 감당 무게 이하면
            //    다리 위 트럭 무게 업데이트, 큐 뒤에 [트럭무게, 이 트럭이 나갈 시간] 추가.
            weightOnBridge += truck_weights[0];
            qu.push([truck_weights.shift(), time + bridge_length]);
        } else {
            // 3. 다음 트럭이 못올라오는 상황이면 얼른 큐의
            //    첫번째 트럭이 빠지도록 그 시간으로 점프한다.
            //    참고: if 밖에서 1 더하기 때문에 -1 해줌
            if (qu[0]) time = qu[0][1] - 1;
        }
        // 시간 업데이트 해준다.
        time++;
    }
    return time;
}

console.log(solution1(bridge_length, weight, truck_weights));