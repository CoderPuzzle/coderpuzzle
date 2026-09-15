/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
var countWords = function (words1, words2) {
    const count = (words) => {
        const frequencies = new Map();
        for (const word of words) frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
        return frequencies;
    };
    const first = count(words1);
    const second = count(words2);
    let answer = 0;
    for (const [word, frequency] of first) {
        if (frequency === 1 && second.get(word) === 1) answer++;
    }
    return answer;
};
