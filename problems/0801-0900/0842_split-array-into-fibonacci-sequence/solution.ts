function splitIntoFibonacci(num: string): number[] {
    // Only the first two pieces of a split are free — every later term is
    // the sum of the two before it — so a candidate split is nothing but a
    // pair of cuts. Try cut pairs shortest piece first (a term fits in 32
    // bits, so ten digits cap each piece), follow the forced run under each
    // pair, and return the first sequence that consumes the string: exactly
    // the shortest-first split the statement pins.
    const limit = 2147483647;
    const n = num.length;
    for (let i = 1; i <= Math.min(10, n - 2); i++) {
        if (num[0] === "0" && i > 1) {
            break;
        }
        const a = Number(num.slice(0, i));
        if (a > limit) {
            break;
        }
        for (let j = i + 1; j <= Math.min(i + 10, n - 1); j++) {
            if (num[i] === "0" && j - i > 1) {
                break;
            }
            const b = Number(num.slice(i, j));
            if (b > limit) {
                break;
            }
            const seq: number[] = [a, b];
            let pos = j;
            let x = a;
            let y = b;
            while (pos < n) {
                const z = x + y;
                if (z > limit) {
                    break;
                }
                const s = String(z);
                if (!num.startsWith(s, pos)) {
                    break;
                }
                seq.push(z);
                pos += s.length;
                x = y;
                y = z;
            }
            if (pos === n) {
                return seq;
            }
        }
    }
    return [];
}
