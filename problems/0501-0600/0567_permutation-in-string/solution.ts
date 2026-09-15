function checkInclusion(s1: string, s2: string): boolean {
    const m = s1.length;
    const n = s2.length;
    // No window of length m can exist inside a shorter s2.
    if (m > n) {
        return false;
    }
    const need = new Array<number>(26).fill(0);
    const window = new Array<number>(26).fill(0);
    const a = "a".charCodeAt(0);
    for (const ch of s1) {
        need[ch.charCodeAt(0) - a]++;
    }
    for (const ch of s2.slice(0, m)) {
        window[ch.charCodeAt(0) - a]++;
    }
    // Matching frequency vectors means the window is a permutation of s1.
    if (matches(need, window)) {
        return true;
    }
    for (let i = m; i < n; i++) {
        // Slide one position: add the entering char, drop the leaving one.
        window[s2.charCodeAt(i) - a]++;
        window[s2.charCodeAt(i - m) - a]--;
        if (matches(need, window)) {
            return true;
        }
    }
    return false;
}

function matches(need: number[], window: number[]): boolean {
    for (let i = 0; i < 26; i++) {
        if (need[i] !== window[i]) {
            return false;
        }
    }
    return true;
}
