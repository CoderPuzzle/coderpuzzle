function isNStraightHand(hand: number[], groupSize: number): boolean {
    // A divisible hand must be a multiple of groupSize long.
    if (hand.length % groupSize !== 0) {
        return false;
    }
    const counts = new Map<number, number>();
    for (const v of hand) {
        counts.set(v, (counts.get(v) || 0) + 1);
    }
    const values = Array.from(counts.keys()).sort((a, b) => a - b);
    // Walk distinct values in sorted order: the smallest remaining
    // value must start its groups — nothing smaller exists to
    // extend downward.
    for (const value of values) {
        const need = counts.get(value)!;
        if (need > 0) {
            // Each of the next groupSize-1 values must supply at
            // least `need` cards; subtracting in bulk keeps this to
            // one pass per starting value.
            for (let nv = value; nv < value + groupSize; nv++) {
                const have = counts.get(nv) || 0;
                if (have < need) {
                    return false;
                }
                counts.set(nv, have - need);
            }
        }
    }
    // Exhausted values reach the loop at count 0 and skip for
    // free; consuming the smallest fully makes the rest a smaller
    // instance of the same problem.
    return true;
}
