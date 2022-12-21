const map = [
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1]
];

function solution(map) {
    const endY = map.length;
    const endX = map[map.length - 1].length;
    const visitCheckMap = Array.from(Array(endY), () => Array(endX).fill(0))
    visitCheckMap[0][0] = 1;
    const mapCheckQueue = [[0, 0]];

    while (mapCheckQueue.length !== 0) {
        const [nowY, nowX] = mapCheckQueue.shift();
        const nextPositionList = [
            [nowY, nowX + 1],
            [nowY + 1, nowX],
            [nowY, nowX - 1],
            [nowY - 1, nowX],
        ];

        for (const p of nextPositionList) {
            if (p[0] === endY - 1 && p[1] === endX - 1) {
                if (map[p[0][p[1]]] === 0) return -1;
                return visitCheckMap[nowY][nowX] + 1;
            }
            if (p[0] < 0 || p[1] < 0 || p[0] > endY - 1 || p[1] > endX || map[p[0]][p[1]] === 0 || visitCheckMap[p[0]][p[1]] !== 0) continue;

            visitCheckMap[p[0]][p[1]] = visitCheckMap[nowY][nowX] + 1;

            mapCheckQueue.push([p[0], p[1]]);
        }

    }

    return -1;
}

console.log(solution(map));

/**
 * 위 코드 작성 20분소요
 * 위 코드 이전 버전은 몇시간동안 수정하였으나 효율성에서 ㅈ망함
 * 문제가 있는 코드를 고치려고 할게 아니라
 * 이전 코드 구현 경험을 기반으로 새로 짜는것이 훨씬 효율적이라는것을 이번 코딩에서 얻은 교훈
 */
