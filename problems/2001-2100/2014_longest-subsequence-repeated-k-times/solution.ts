function longestSubsequenceRepeatedK(s: string, k: number): string {
    const quotas: number[] = new Array(26).fill(0);
    for (const character of s) ++quotas[character.charCodeAt(0) - 97];
    for (let index = 0; index < 26; ++index) quotas[index] = Math.floor(quotas[index] / k);

    const isRepeated = (candidate: string): boolean => {
        let matched = 0;
        let completed = 0;
        for (const character of s) {
            if (character === candidate[matched]) {
                ++matched;
                if (matched === candidate.length) {
                    if (++completed === k) return true;
                    matched = 0;
                }
            }
        }
        return false;
    };

    let best = "";
    const search = (candidate: string): void => {
        if (candidate.length > best.length || (candidate.length === best.length && candidate > best)) {
            best = candidate;
        }
        for (let index = 25; index >= 0; --index) {
            if (quotas[index] === 0) continue;
            --quotas[index];
            const extended = candidate + String.fromCharCode(97 + index);
            if (isRepeated(extended)) search(extended);
            ++quotas[index];
        }
    };

    search("");
    return best;
}
