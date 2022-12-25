const fs = require('fs');
let list = fs.readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./algorithm/백준/문자열/그룹 단어 체커/input.txt"
).toString().split('\n');

let cnt = Number(list[0]);

for (let i = 1; i < list.length; i++) {
    const str = list[i].trim();

    for (let j = 0; j < str.length; j++) {
        const checkStr = str.substring(j, str.lastIndexOf(str[j]) + 1);

        if (checkStr.replace(new RegExp(`${str[j]}`, 'g'), '') !== '') {
            cnt--;
            break;
        }
    }
}

console.log(cnt)