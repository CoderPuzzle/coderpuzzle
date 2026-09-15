function numSplits(s: string): number {
    const n = s.length;

    // prefix[i]: number of distinct letters in s[0..i]
    const prefix = new Array<number>(n);
    let seen = new Array<boolean>(26).fill(false);
    let distinct = 0;
    for (let i = 0; i < n; i++) {
        const idx = s.charCodeAt(i) - 97;
        if (!seen[idx]) {
            seen[idx] = true;
            distinct++;
        }
        prefix[i] = distinct;
    }

    // suffix[i]: number of distinct letters in s[i..n-1]
    const suffix = new Array<number>(n);
    seen = new Array<boolean>(26).fill(false);
    distinct = 0;
    for (let i = n - 1; i >= 0; i--) {
        const idx = s.charCodeAt(i) - 97;
        if (!seen[idx]) {
            seen[idx] = true;
            distinct++;
        }
        suffix[i] = distinct;
    }

    let count = 0;
    for (let i = 0; i < n - 1; i++) {
        if (prefix[i] === suffix[i + 1]) {
            count++;
        }
    }
    return count;
}
