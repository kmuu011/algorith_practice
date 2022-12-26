const fs = require('fs');
const list = fs.readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./algorithm/백준/BFS/바이러스/input.txt"
).toString().split('\n');

console.log(list);