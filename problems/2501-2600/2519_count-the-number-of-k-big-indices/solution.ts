function kBigIndices(nums: number[], k: number): number {
    // smallerCounts walks one Fenwick tree over the value range and
    // records, for every index, how many strictly smaller values sit
    // before it.
    const smallerCounts = (values: number[]): number[] => {
        let top = 0;
        for (const v of values) if (v > top) top = v;
        const tree = new Array(top + 1).fill(0);
        const counts = new Array(values.length).fill(0);
        for (let i = 0; i < values.length; ++i) {
            for (let j = values[i] - 1; j > 0; j -= j & -j) counts[i] += tree[j];
            for (let j = values[i]; j <= top; j += j & -j) tree[j] += 1;
        }
        return counts;
    };
    // Two Fenwick sweeps over the value range answer, for every index, how
    // many strictly smaller values sit on each side: a forward pass fills
    // the left counts and a backward pass reruns the helper on a fresh
    // tree for the right ones. An index is k-big exactly when both counts
    // reach k. Counts stay below 1e5 -- far inside Number's exact range.
    const left = smallerCounts(nums);
    const reversed = [...nums].reverse();
    const right = smallerCounts(reversed);
    let big = 0;
    for (let i = 0; i < nums.length; ++i) if (left[i] >= k && right[nums.length - 1 - i] >= k) ++big;
    return big;
}
