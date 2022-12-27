const s = "...!@BaT#*..y.abcdefghijklm";

function solution(s) {
    s = s.toLowerCase();
    s = s.replace(/[^a-z0-9.\-_]/g, '')
        .replace(/\.*\./g, '.')
        .replace(/^\.|\.$/g, '');

    if(s.length === 0) s += 'a';

    s = s.substring(0, 15).replace(/^\.|\.$/g, '');

    if(s.length < 3)s = s + Array(3-s.length).fill(s[s.length-1]).join('')

    return s
}

console.log(solution(s));