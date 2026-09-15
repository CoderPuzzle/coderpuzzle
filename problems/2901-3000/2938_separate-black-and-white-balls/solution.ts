function minimumSteps(s: string): number {
    // Swaps only happen between adjacent balls, and two balls of the
    // same color never need to cross, so the minimum number of swaps is
    // exactly the number of (1, 0) inversions: each 1 must pass every 0
    // sitting to its right. One right-to-left sweep counts them —
    // accumulate the zeros seen so far and add that to the answer at
    // every 1. The count peaks at 2.5 x 10^9, far inside JavaScript's
    // exact 2^53 integer range.
    let total = 0;
    let zeros = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === "0") {
            zeros += 1;
        } else {
            total += zeros;
        }
    }
    return total;
}
