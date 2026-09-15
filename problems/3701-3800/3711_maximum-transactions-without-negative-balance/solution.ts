function maxTransactions(transactions: number[]): number {
    // Greedy scan with a max-heap of the debits already taken: take every
    // transaction that leaves the balance nonnegative, and when a debit
    // does not fit, refund the largest debit taken earlier if it was
    // strictly bigger and take the smaller one instead — same count, a
    // higher balance, and room for later, smaller debits. Running balances
    // reach 10^14, safely under Number's exact 2^53 integer range.
    const push = (h: number[], v: number): void => {
        h.push(v);
        let c = h.length - 1;
        while (c > 0) {
            const p = (c - 1) >> 1;
            if (h[p] >= h[c]) {
                break;
            }
            const tmp = h[p];
            h[p] = h[c];
            h[c] = tmp;
            c = p;
        }
    };
    const pop = (h: number[]): number => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                if (l >= h.length) {
                    break;
                }
                let m = l;
                if (l + 1 < h.length && h[l + 1] > h[l]) {
                    m = l + 1;
                }
                if (h[m] > h[i]) {
                    const tmp = h[i];
                    h[i] = h[m];
                    h[m] = tmp;
                    i = m;
                } else {
                    break;
                }
            }
        }
        return top;
    };
    let balance = 0;
    let kept = 0;
    const debits: number[] = []; // magnitudes of the debits taken so far (max-heap)
    for (const t of transactions) {
        if (t >= 0 || balance + t >= 0) {
            kept += 1;
            balance += t;
            if (t < 0) {
                push(debits, -t);
            }
        } else if (debits.length > 0 && debits[0] > -t) {
            balance += pop(debits); // refund the larger debit
            balance += t;
            push(debits, -t);
        }
    }
    return kept;
}
