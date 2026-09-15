function validSubstringCount(word1: string, word2: string): number {
    // A window is valid exactly when its counts cover word2's counts.
    // Track how many required characters are still `missing`; when it
    // hits zero every extension r' >= r of the current right end works,
    // contributing n - r windows for this left end. The minimal right
    // end never decreases as l advances, so each character enters and
    // leaves the window once — linear overall.
    const n = word1.length;
    const need = new Array<number>(26).fill(0);
    for (let i = 0; i < word2.length; i++) {
        need[word2.charCodeAt(i) - 97]++;
    }
    let missing = 0;
    for (let c = 0; c < 26; c++) {
        missing += need[c];
    }
    const have = new Array<number>(26).fill(0);
    let total = 0;
    let r = 0;
    for (let l = 0; l < n; l++) {
        // Grow the window until it first covers word2.
        while (r < n && missing > 0) {
            const c = word1.charCodeAt(r) - 97;
            have[c]++;
            if (need[c] > 0 && have[c] <= need[c]) {
                missing--;
            }
            r++;
        }
        if (missing > 0) {
            // No window starting at l (or any later l) can cover word2.
            break;
        }
        total += n - (r - 1);
        // Drop word1[l] before moving to the next left end.
        const c = word1.charCodeAt(l) - 97;
        have[c]--;
        if (need[c] > 0 && have[c] < need[c]) {
            missing++;
        }
    }
    // The answer tops out near n^2/2 = 5e11, far below Number.MAX_SAFE_INTEGER
    // (2^53 = 9.007e15), so ordinary doubles accumulate it exactly.
    return total;
}
