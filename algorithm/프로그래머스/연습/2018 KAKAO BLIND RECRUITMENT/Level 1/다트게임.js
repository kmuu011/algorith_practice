const dartResult = "1S2D*3T";

const bonusInfo = {
    'S': 1,
    'D': 2,
    'T': 3
};

function solution(dartResult) {
    const result = [];
    const scoreList = [];
    let str = '';

    for (let i = 0; i < dartResult.length; i++) {
        const s = dartResult[i];
        const nextS = dartResult[i + 1];

        if ((/[0-9]/).test(s)) {
            str += s;
        } else {
            str += s;
            if (nextS !== undefined && !(/[0-9]/).test(nextS)) {
                str += dartResult[i + 1];
                i++;
            }
            result.push(str);
            str = '';
        }
    }

    for (const r of result) {
        let score = parseInt(r);
        const additional = r.replace(score.toString(), '');
        const bonus = bonusInfo[additional[0]];
        const option = additional[1];

        score = Math.pow(score, [bonus]);

        if(option === '*'){
            score *= 2;
            if(scoreList[scoreList.length-1]){
                scoreList[scoreList.length-1] *= 2;
            }
        }else if(option === '#'){
            score *= -1;
        }

        scoreList.push(score);
    }

    return scoreList.reduce((score, v) => score+= v, 0)
}

console.log(solution(dartResult));