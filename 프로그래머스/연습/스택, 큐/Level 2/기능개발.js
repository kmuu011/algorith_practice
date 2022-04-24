/**
 * 문제 설명
 * 프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.
 *
 * 또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.
 *
 * 먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가
 * 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.
 *
 * 제한 사항
 * 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
 * 작업 진도는 100 미만의 자연수입니다.
 * 작업 속도는 100 이하의 자연수입니다.
 * 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.
 *
 * 입출력 예
 * progresses    speeds    return
 * [93, 30, 55]    [1, 30, 5]    [2, 1]
 * [95, 90, 99, 99, 80, 99]    [1, 1, 1, 1, 1, 1]    [1, 3, 2]
 *
 * 입출력 예 설명
 * 입출력 예 #1
 * 첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
 * 두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
 * 세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.
 *
 * 따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.
 *
 * 입출력 예 #2
 * 모든 기능이 하루에 1%씩 작업이 가능하므로, 작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.
 *
 * 따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.
 *
 * */

const progresses = [95, 90, 99, 99, 80, 99];
const speeds = [1, 1, 1, 1, 1, 1]	;

// 코드를 짜면서 좀더 나은방법으로 끊임없이 시도해서 개ㅈ박은 문제
// 일단 심플하게 짤 수 있는 방식으로 시도해보고 더 나은방식은 의도대로 정상 작동하는
// 프로토타입 형식의 알고리즘이 완성된 뒤 원리를 좀더 깊게 파악하며 시도하는 편이 좋을듯
// array에서 .shift(), .pop() 에 대한 지식을 얻게됨
// .pop() : 배열의 맨 끝값 제거
// .shift() : 배열 맨 앞값 제거
// .push() : 배열 맨 끝에 값 추가
// .unshift() : 배열 맨 앞에 값 추가
function solution(progresses, speeds) {
    const doneList = [];
    let count = 0;

    while(progresses[0]) {
        for (let i=0 ; i<progresses.length ; i++) {
            progresses[i] += speeds[i];
        }

        for(let i=0 ; i<progresses.length ; i++){
            if(progresses[i] >= 100){
                count++;
                progresses.shift();
                speeds.shift();
                i--;
            }else{
                break;
            }
        }

        if(count !== 0) doneList.push(count);
        count = 0;
    }

    return doneList;
}

// console.log(solution(progresses, speeds));


// 다른 레전드가 짠 코드
// 리스트상에 작업들의 완료까지 걸리는 일자를 days로 먼저 구한 다음
// 다음 작업완료 일자와 비교하여 다음 완료일자가 더 클경우 
// 카운트를 끊는 식으로 처리됨
/**
 * 하지만 아래방식은 속도가 위에 방식보다 많이느림
 */
function solution1(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index]));
    let maxDay = days[0];

    console.log(days);

    for(let i = 0, j = 0; i< days.length; i++){
        if(days[i] <= maxDay) {
            answer[j] += 1;
        } else {
            maxDay = days[i];
            answer[++j] = 1;
        }
    }

    return answer;
}

solution1(progresses, speeds);