function numKLenSubstrNoRepeats(s: string, k: number): number {
    // A window of length k is valid exactly when all k positions hold
    // different characters, i.e. distinct == k. Slide in place.
    const n = s.length;
    if (k > n || k > 26) return 0;
    const freq = new Array(26).fill(0);
    let distinct = 0;
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        const right = s.charCodeAt(i) - 97;
        if (++freq[right] === 1) ++distinct;
        if (i >= k) {
            const left = s.charCodeAt(i - k) - 97;
            if (--freq[left] === 0) --distinct;
        }
        if (distinct === k) ++ans;
    }
    return ans;
}
