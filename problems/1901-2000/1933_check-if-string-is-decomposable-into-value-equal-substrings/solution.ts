function isDecomposable(s: string): boolean {
    // A run is a maximal block of equal digits. A run of length L must
    // split into 3-length pieces plus at most one 2-length piece, so
    // L % 3 is 0 (no 2) or 2 (one 2); L % 3 == 1 can never be split.
    let twos = 0;
    for (let i = 0; i < s.length;) {
        let j = i;
        while (j < s.length && s[j] === s[i]) {
            j++;
        }
        const length = j - i;
        if (length % 3 === 1) {
            return false;
        }
        if (length % 3 === 2) {
            twos++;
            if (twos > 1) {
                return false;
            }
        }
        i = j;
    }
    return twos === 1;
}
