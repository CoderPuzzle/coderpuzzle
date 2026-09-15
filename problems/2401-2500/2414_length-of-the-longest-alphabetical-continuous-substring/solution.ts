function longestContinuousSubstring(s: string): number {
    let best = 1;
    let run = 1;
    for (let i = 1; i < s.length; i++) {
        run = s.charCodeAt(i) === s.charCodeAt(i - 1) + 1 ? run + 1 : 1;
        best = Math.max(best, run);
    }
    return best;
}
