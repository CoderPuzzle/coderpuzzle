function minAnagramLength(s: string): number {
    // t repeats, so len(t) = L divides n = len(s) and every n / L chunk
    // must carry the same letter multiset as the first chunk: sweep the
    // divisors of n ascending and take the first survivor. A running
    // count that exceeds the first chunk's count already proves the
    // chunk differs, so failed candidates die early.
    const n = s.length;
    const works = (length: number): boolean => {
        const base = new Array<number>(26).fill(0);
        for (let i = 0; i < length; i++) base[s.charCodeAt(i) - 97]++;
        const run = new Array<number>(26).fill(0);
        let filled = 0;
        for (let i = 0; i < n; i++) {
            const c = s.charCodeAt(i) - 97;
            if (++run[c] > base[c]) return false;
            if (++filled === length) {
                for (let j = 0; j < 26; j++) {
                    if (run[j] !== base[j]) return false;
                }
                run.fill(0);
                filled = 0;
            }
        }
        return filled === 0;
    };
    for (let length = 1; length <= n; length++) {
        if (n % length === 0 && works(length)) return length;
    }
    return n;
}
