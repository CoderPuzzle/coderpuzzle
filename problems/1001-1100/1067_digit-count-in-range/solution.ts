function digitsCount(d: number, low: number, high: number): number {
    const countUpTo = (d: number, n: number): number => {
        if (n <= 0) {
            return 0;
        }
        const s = String(n);
        const length = s.length;
        let total = 0;
        // Count, per digit position, the numbers <= n with d there:
        // n = highPart * 10^power + cur * 10^power + lowPart.
        for (let i = 0; i < length; i++) {
            const highPart = i > 0 ? parseInt(s.slice(0, i), 10) : 0;
            const cur = s.charCodeAt(i) - 48;
            const lowPart = i + 1 < length ? parseInt(s.slice(i + 1), 10) : 0;
            let power = 1;
            for (let k = 0; k < length - 1 - i; k++) {
                power *= 10;
            }
            if (d === 0) {
                // Leading zeros are never written: skip a zero high part, and
                // the -1 forbids a leading zero on this position.
                if (highPart >= 1) {
                    if (cur > 0) {
                        total += highPart * power;
                    } else {
                        total += (highPart - 1) * power + lowPart + 1;
                    }
                }
            } else {
                // cur > d: prefix-equal numbers may put anything below;
                // cur == d: only suffixes up to lowPart still qualify.
                if (cur > d) {
                    total += (highPart + 1) * power;
                } else if (cur === d) {
                    total += highPart * power + lowPart + 1;
                } else {
                    total += highPart * power;
                }
            }
        }
        return total;
    };
    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    return countUpTo(d, high) - countUpTo(d, low - 1);
}
