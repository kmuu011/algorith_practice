const musicList = ["12:00,12:3,HELLO,CDEFGAB", "13:00,13:01,WORLD,ABCDEF"]
const m = "CDECDE";

function solution(m, musicList) {
    m = m
        .replace(/C#/g, 'c')
        .replace(/D#/g, 'd')
        .replace(/F#/g, 'f')
        .replace(/G#/g, 'g')
        .replace(/A#/g, 'a');

    musicList = musicList.map(v => {
        const infoList = v.split(',');

        return {
            start: infoList[0],
            end: infoList[1],
            title: infoList[2],
            melody: infoList[3].replace(/C#/g, 'c')
                .replace(/D#/g, 'd')
                .replace(/F#/g, 'f')
                .replace(/G#/g, 'g')
                .replace(/A#/g, 'a')
        }
    });

    const searchedList = [];

    for (const music of musicList) {
        const {start, end, melody} = music;
        const startSplit = start.split(':');
        const endSplit = end.split(':');

        music.playTime = (endSplit[0] * 60 + Number(endSplit[1])) - (startSplit[0] * 60 + Number(startSplit[1]));

        let fullMelody = '';

        for(let i=0 ; i<Math.ceil(m.length/melody.length)+2 ; i++){
            fullMelody += melody.substring(0, (music.playTime<melody.length ? music.playTime : undefined));
        }

        if(fullMelody.indexOf(m) === -1) continue;

        searchedList.push(music);
    }

    if(searchedList.length === 0) return "(None)";

    searchedList.sort((a,b) => b.playTime - a.playTime);

    return searchedList[0].title;
}

console.log(solution(m, musicList));

/**
 * 30번 케이스에서 계속 실패했음
 * 이유는 도레미파 라는 음악을 3분만 플레이해서 도레미 까지만 들었을때
 * 유저가 도레미도레미도레미 이런식으로 검색했을때 도레미파 라는 음악이 검색되어야 하는 조건이었음
 * */