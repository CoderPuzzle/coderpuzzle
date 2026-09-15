function maxSubstringLength(s: string, k: number): boolean {
    const n = s.length;
    const first = new Array<number>(26).fill(-1);
    const last = new Array<number>(26).fill(0);
    for (let i = 0; i < n; ++i) {
        const c = s.charCodeAt(i) - 97;
        if (first[c] === -1) first[c] = i;
        last[c] = i;
    }
    const intervals: [number, number][] = [];
    // Every special substring starts at the first occurrence of its first
    // letter — any earlier repeat would sit outside it — so at most 26
    // candidate starts exist.
    for (let c = 0; c < 26; ++c) {
        if (first[c] === -1) continue;
        const a = first[c];
        // Grow the window right until it covers every occurrence of every
        // character inside it; a character leaking left of the start
        // invalidates this start entirely.
        let far = last[c];
        let ok = true;
        for (let j = a; j <= far; ++j) {
            const x = s.charCodeAt(j) - 97;
            if (first[x] < a) {
                ok = false;
                break;
            }
            if (last[x] > far) far = last[x];
        }
        // The whole string itself is not a valid selection.
        if (ok && (a > 0 || far < n - 1)) intervals.push([a, far]);
    }
    // Classic activity selection: taking earliest ends leaves the most
    // room for further disjoint picks.
    intervals.sort((u, v) => u[1] - v[1]);
    let count = 0;
    let end = -1;
    for (const [a, b] of intervals) {
        if (a > end) {
            ++count;
            end = b;
        }
    }
    return count >= k;
}
