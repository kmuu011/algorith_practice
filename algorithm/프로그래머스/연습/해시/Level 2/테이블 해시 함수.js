const data = [[2,2,6],[1,5,10],[4,2,9],[3,8,3]],
    col = 2,
    row_begin = 2,
    row_end = 3;

function solution(data, col, row_begin, row_end) {
    const objList = data.map(v => {
        const obj = v.reduce((acc, v, i) => {
            acc[i+1] = v;
            return acc;
        }, {})

        return obj
    }).sort((a, b) => {
        if(a[col] === b[col]){
            return b['1'] - a['1'];
        }
        return a[col]-b[col]
    })

    const list = [];

    for(let i=row_begin ; i<=row_end ; i++){
        list.push(Object.keys(objList[i-1]).reduce((acc, k ) => acc += objList[i-1][k] % i, 0))
    }

    return list.reduce((acc, v) => acc ^= v, 0)
}

console.log(solution(data, col, row_begin, row_end))