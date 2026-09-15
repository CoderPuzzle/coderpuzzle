function minimumPushes(word: string): number {
    const counts = new Array<number>(26).fill(0);
    for (let index = 0; index < word.length; index++) {
        counts[word.charCodeAt(index) - 97]++;
    }
    counts.sort((left, right) => right - left);
    let answer = 0;
    for (let index = 0; index < 26; index++) {
        answer += counts[index] * (Math.floor(index / 8) + 1);
    }
    return answer;
}
