function maximizeGreatness(nums: number[]): number {
    // Sort the array; then scan a second sorted copy of the same multiset
    // with a fast pointer that always offers the smallest not yet committed
    // value strictly greater than the current element. Spending the
    // cheapest sufficient value on each position in increasing order is an
    // exchange-argument optimum, so the number of commitments is the
    // greatness.
    const arr = [...nums].sort((a, b) => a - b);
    const supply = [...nums].sort((a, b) => a - b);
    let count = 0;
    let j = 0;
    for (const x of arr) {
        while (j < supply.length && supply[j] <= x) {
            j++;
        }
        if (j === supply.length) {
            break;
        }
        count++;
        j++;
    }
    return count;
}
