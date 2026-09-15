function maximumBooks(books: number[]): number {
    const n = books.length;
    // dp[i] = best total of a strictly increasing chain ending at i;
    // the rightmost shelf gives everything, so each take is books[i]-(i-x).
    const dp: number[] = new Array(n).fill(0);
    // Monotonic stack of barrier candidates (nearest j where the chain dies).
    let stack: number[] = [];
    for (let i = 0; i < n; i++) {
        const bi = books[i];
        // Pop shelves x that still fit the demand books[i] - (i - x):
        // any future chain stopping past them stops at or before i.
        while (stack.length && books[stack[stack.length - 1]] >= bi - (i - stack[stack.length - 1])) {
            stack.pop();
        }
        // Remaining top is the nearest barrier j; the chain covers j+1..i.
        const j = stack.length ? stack[stack.length - 1] : -1;
        let length: number;
        if (j >= 0) {
            length = i - j;
        } else {
            // No barrier: the chain runs to shelf 0, but a shelf cannot
            // demand fewer than one book, so it caps at min(i, books[i])+1.
            length = Math.min(i, bi) + 1; // stop where the sequence would go negative
        }
        // Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
        // strictly below the demanded value, so the two chains join validly.
        const s = length * bi - (length * (length - 1)) / 2;
        dp[i] = s + (j >= 0 ? dp[j] : 0);
        stack.push(i);
    }
    let best = -Infinity;
    for (const x of dp) {
        if (x > best) best = x;
    }
    return best;
}
