function minValidStrings(words: string[], target: string): number {
    // reach[i] is the largest L with target[i:i+L] a prefix of some word:
    // for each word, one Z-function over word + separator + target yields,
    // at every target offset, how many characters continue to match the
    // word's own prefix. With reach fixed, the pieces form a jump game:
    // standing at position i jumps right by any length in [1, reach[i]],
    // and the fewest jumps to cover n characters is the classic layered
    // greedy scan — every position folds its reach into the frontier
    // before the boundary trigger fires.
    const n = target.length;
    const codes = new Array<number>(n);
    for (let i = 0; i < n; i++) {
        codes[i] = target.charCodeAt(i);
    }
    const reach: number[] = new Array(n).fill(0);
    for (const w of words) {
        const values = new Array<number>(w.length + 1 + n);
        for (let k = 0; k < w.length; k++) {
            values[k] = w.charCodeAt(k);
        }
        values[w.length] = -1;
        for (let k = 0; k < n; k++) {
            values[w.length + 1 + k] = codes[k];
        }
        const z = zFunction(values);
        const base = w.length + 1;
        for (let i = 0; i < n; i++) {
            if (z[base + i] > reach[i]) {
                reach[i] = z[base + i];
            }
        }
    }
    let steps = 0;
    let curEnd = 0; // with `steps` pieces, target[:curEnd] is formable
    let farthest = 0;
    for (let i = 0; i < n; i++) {
        const r = i + reach[i];
        if (r > farthest) {
            farthest = r;
        }
        if (i === curEnd) {
            if (farthest <= curEnd) {
                return -1;
            }
            steps++;
            curEnd = farthest;
            if (curEnd >= n) {
                return steps;
            }
        }
    }
    return -1;
}

function zFunction(values: number[]): number[] {
    const m = values.length;
    const z: number[] = new Array(m).fill(0);
    z[0] = m;
    let left = 0;
    let right = 0;
    for (let i = 1; i < m; i++) {
        if (i < right) {
            z[i] = Math.min(right - i, z[i - left]);
        }
        while (i + z[i] < m && values[z[i]] === values[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] > right) {
            left = i;
            right = i + z[i];
        }
    }
    return z;
}
