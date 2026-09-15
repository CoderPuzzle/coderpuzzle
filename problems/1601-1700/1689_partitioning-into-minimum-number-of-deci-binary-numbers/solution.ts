function minPartitions(n: string): number {
    // Every deci-binary summand contributes at most 1 to any one digit
    // position, so k summands leave every digit <= k — the answer is at
    // least the largest digit. Subtracting one deci-binary layer per pass
    // (a 1 under every still-positive digit) attains that bound exactly,
    // so the answer is the largest digit: scan for it.
    let best = 0;
    for (const ch of n) {
        const digit = Number(ch);
        best = Math.max(best, digit);
    }
    return best;
}
