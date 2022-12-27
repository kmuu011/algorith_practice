const fs = require('fs');
const list = fs.readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./input.txt"
).toString().split('\n').map(v => v.trim().split(' '));

const obj = {};
const infectedObj = {};
const queue = [1];

for (let i = 2; i < list.length; i++) {
    const [start, end] = list[i].map(Number);

    if (obj[start] === undefined) {
        obj[start] = [end];
    } else {
        obj[start].push(end);
    }
    if (obj[end] === undefined) {
        obj[end] = [start];
    } else {
        obj[end].push(start);
    }
}

while (queue.length !== 0) {
    const start = queue.shift();

    if (obj[start] === undefined) continue;

    for (const end of obj[start]) {
        if (infectedObj[end] === '' || end === 1) continue
        infectedObj[end] = '';
        queue.push(end);
    }
}

console.log(Object.keys(infectedObj).length);
