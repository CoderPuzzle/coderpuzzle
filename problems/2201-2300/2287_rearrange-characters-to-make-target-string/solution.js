/**
 * @param {string} s
 * @param {string} target
 * @return {number}
 */
var rearrangeCharacters = function (s, target) {
    const have = new Array(26).fill(0);
    const need = new Array(26).fill(0);
    for (const ch of s) have[ch.charCodeAt(0) - 97]++;
    for (const ch of target) need[ch.charCodeAt(0) - 97]++;
    let answer = 100;
    for (let ch = 0; ch < 26; ch++) {
        if (need[ch] === 0) continue;
        answer = Math.min(answer, Math.floor(have[ch] / need[ch]));
    }
    return answer;
};
