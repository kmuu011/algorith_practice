const places = [
    [
        "PXOOP",
        "PPXOX",
        "OXXPX",
        "OOXOX",
        "POXXP"],
    ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
    ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
    ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
    ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];


function solution(places) {
    const placesState = [];

    loop:
        for (const p of places) {
            for (let y = 0; y < p.length; y++) {
                const row = p[y].split('');

                for (let x = 0; x < row.length; x++) {
                    if (p[y][x] !== 'P') continue;

                    const checkList = [
                        [[y + 1, x], [y + 2, x]],
                        [[y, x + 1], [y, x + 2]],
                        [[y - 1, x], [y - 2, x]],
                        [[y, x - 1], [y, x - 2]],
                    ];

                    for (const position of checkList) {
                        for (const pp of position) {
                            if (pp[0] < 0 || pp[1] < 0 || pp[0] > 4 || pp[1] > 4) continue;
                            if (p[pp[0]][pp[1]] === 'X') break;
                            if (p[pp[0]][pp[1]] === 'P') {
                                placesState.push(0);
                                continue loop;
                            }
                        }
                    }

                    const diagonalCheckList = [
                        [y + 1, x + 1, [[y + 1, x], [y, x + 1]]],
                        [y - 1, x + 1, [[y - 1, x], [y, x + 1]]],
                        [y - 1, x - 1, [[y, x - 1], [y - 1, x]]],
                        [y + 1, x - 1, [[y, x - 1], [y + 1, x]]],
                    ];

                    for (const position of diagonalCheckList) {
                        if (position[0] < 0 || position[1] < 0 || position[0] > 4 || position[1] > 4 || p[position[0]][position[1]] !== 'P') continue;

                        for (const yx of position[2]) {
                            if (yx[0] < 0 || yx[1] < 0 || yx[0] > 4 || yx[1] > 4) continue;
                            if (p[yx[0]][yx[1]] === 'O') {
                                placesState.push(0);
                                continue loop;
                            }
                        }
                    }
                }
            }

            placesState.push(1);
        }

    return placesState;
}

console.log(solution(places));