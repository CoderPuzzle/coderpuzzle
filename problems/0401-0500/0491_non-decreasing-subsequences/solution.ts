function findSubsequences(nums: number[]): number[][] {
    // One decision per index — take the value or skip it — so every leaf of
    // the tree is exactly one subset of indices. A leaf holding at least two
    // non-decreasing values is one answer; equal values reach the same value
    // sequence through different index subsets, so a set absorbs those
    // duplicates and the final sort emits the pinned lexicographic order.
    // The set's keys join the integers with commas, which numbers cannot
    // contain, so distinct keys mean distinct sequences.
    const found = new Set<string>();
    const current: number[] = [];

    const walk = (index: number): void => {
        if (index === nums.length) {
            if (current.length >= 2) {
                found.add(current.join(","));
            }
            return;
        }
        // Take nums[index] when it does not decrease.
        if (current.length === 0 || nums[index] >= current[current.length - 1]) {
            current.push(nums[index]);
            walk(index + 1);
            current.pop();
        }
        // Skip nums[index].
        walk(index + 1);
    };

    walk(0);
    return [...found]
        .map((key) => key.split(",").map(Number))
        .sort((left: number[], right: number[]) => {
            const shared = Math.min(left.length, right.length);
            for (let i = 0; i < shared; ++i) {
                if (left[i] !== right[i]) {
                    return left[i] - right[i];
                }
            }
            return left.length - right.length;
        });
}
