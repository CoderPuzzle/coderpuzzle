function longestBalanced(s: string): number {
    const n = s.length;
    // Any single character is balanced, so with n >= 1 the answer is at
    // least 1.
    let best = 1;

    // Case 1 — one distinct letter: balance is vacuous over a run, so track
    // the longest run of equal neighbors.
    let run = 1;
    for (let i = 1; i < n; i++) {
        run = s[i] === s[i - 1] ? run + 1 : 1;
        best = Math.max(best, run);
    }

    // Case 2 — two distinct letters x and y: walk the string ignoring the
    // third letter z, keeping the running difference of their counts. Two
    // positions sharing a difference enclose a stretch that balances the
    // pair. Each z restarts the scan (a window through it would carry a
    // third letter), so first-seen slots carry a version stamp that the
    // split bumps instead of clearing the arrays.
    for (let x = 0; x < 3; x++) {
        for (let y = x + 1; y < 3; y++) {
            const z = 3 - x - y;
            const first = new Int32Array(2 * n + 1).fill(-1);
            const stamp = new Int32Array(2 * n + 1).fill(-1);
            stamp[n] = 0; // difference 0 precedes index 0
            let version = 0,
                d = 0;
            for (let i = 0; i < n; i++) {
                const c = s.charCodeAt(i) - 97;
                if (c === z) {
                    version++;
                    d = 0;
                    stamp[n] = version;
                    first[n] = i;
                } else {
                    d += c === x ? 1 : -1;
                    const v = d + n;
                    if (stamp[v] === version) {
                        best = Math.max(best, i - first[v]);
                    } else {
                        stamp[v] = version;
                        first[v] = i;
                    }
                }
            }
        }
    }

    // Case 3 — all three letters: hash each prefix's signature
    // (count_b - count_a, count_c - count_a); equal signatures at two
    // prefixes mean the stretch between them changed all three counts by the
    // same amounts. The earliest index per signature maximizes length.
    const width = 2 * n + 1;
    const sigs = new Map<number, number>();
    sigs.set(n * width + n, -1);
    let ca = 0,
        cb = 0,
        cc = 0;
    for (let i = 0; i < n; i++) {
        const ch = s[i];
        if (ch === "a") {
            ca++;
        } else if (ch === "b") {
            cb++;
        } else {
            cc++;
        }
        const sig = (cb - ca + n) * width + (cc - ca + n);
        const j = sigs.get(sig);
        if (j === undefined) {
            sigs.set(sig, i);
        } else {
            best = Math.max(best, i - j);
        }
    }

    return best;
}
