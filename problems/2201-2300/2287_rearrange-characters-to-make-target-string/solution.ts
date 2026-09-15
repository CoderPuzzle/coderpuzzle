function rearrangeCharacters(s: string, target: string): number {
    const have = new Array<number>(26).fill(0);
    const need = new Array<number>(26).fill(0);
    for (const ch of s) have[ch.charCodeAt(0) - 97]++;
    for (const ch of target) need[ch.charCodeAt(0) - 97]++;
    let answer = 100;
    for (let ch = 0; ch < 26; ch++) {
        if (need[ch] === 0) continue;
        answer = Math.min(answer, Math.floor(have[ch] / need[ch]));
    }
    return answer;
}
