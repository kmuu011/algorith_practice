const fs = require('fs');
const list = fs.readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./algorithm/백준/문자열/공통 부분 문자열/input.txt"
).toString().split('\n');

const matrix = Array.from(Array(list[1].length), () => Array(list[0].length).fill(0));

const list0 = list[0].trim();
const list1 = list[1].trim();

let cnt = 0;

for (let y = 0; y < list1.length; y++) {
    for (let x = 0; x < list0.length; x++) {
        if (list1[y] === list0[x]) {

            matrix[y][x] = ((y - 1 < 0 || x - 1 < 0) ? 0 : matrix[y - 1][x - 1]) + 1;
            cnt = matrix[y][x] > cnt ? matrix[y][x] : cnt;
        }
    }
}

console.log(cnt)