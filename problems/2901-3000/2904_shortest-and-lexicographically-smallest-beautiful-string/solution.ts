function shortestBeautifulSubstring(s: string, k: number): string {
    // For a fixed left end i, extending right until the window first
    // holds exactly k ones yields the only shortest beautiful candidate
    // that starts at i: any earlier cut has fewer ones, and any later
    // cut with k ones is strictly longer.
    const n = s.length;
    let best = "";
    for (let i = 0; i < n; ++i) {
        let ones = 0;
        for (let j = i; j < n; ++j) {
            if (s[j] === "1") ones += 1;
            if (ones === k) {
                const candidate = s.slice(i, j + 1);
                if (best === "" || candidate.length < best.length) {
                    best = candidate;
                } else if (candidate.length === best.length && candidate < best) {
                    best = candidate;
                }
                break;
            }
        }
    }
    return best;
}
