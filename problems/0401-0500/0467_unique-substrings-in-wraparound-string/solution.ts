// A substring of base is exactly a run of consecutive alphabet letters, and
// a run is pinned by its last letter plus its length — the characters before
// any ending position are forced. So best[c] only needs to track the longest
// run ending at letter c.
function findSubstringInWraproundString(s: string): number {
    const best: number[] = new Array(26).fill(0);
    let run = 0;
    for (let i = 0; i < s.length; ++i) {
        // The run continues when s[i] is the alphabet successor of the
        // previous letter, wrapping z -> a; otherwise it restarts at 1.
        if (i > 0 && (s.charCodeAt(i - 1) - 97 + 1) % 26 === s.charCodeAt(i) - 97) {
            run += 1;
        } else {
            run = 1;
        }
        const j = s.charCodeAt(i) - 97;
        if (run > best[j]) {
            best[j] = run;
        }
    }
    // A run of length L ending at c contributes exactly its L suffixes, all
    // runs, all distinct; the max per letter keeps each once.
    let total = 0;
    for (const value of best) {
        total += value;
    }
    return total;
}
