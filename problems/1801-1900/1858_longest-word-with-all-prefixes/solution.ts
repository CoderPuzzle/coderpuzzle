function longestWord(words: string[]): string {
    // A word qualifies iff every proper prefix chain is present. Sort once;
    // the first qualifying word of each new record length wins, and
    // lexicographic order breaks length ties for free.
    const set = new Set(words);
    let best = "";
    for (const w of [...set].sort()) {
        if (w.length <= best.length) {
            continue;
        }
        let ok = true;
        for (let i = 1; i < w.length; i++) {
            if (!set.has(w.slice(0, i))) {
                ok = false;
                break;
            }
        }
        if (ok) {
            best = w;
        }
    }
    return best;
}
