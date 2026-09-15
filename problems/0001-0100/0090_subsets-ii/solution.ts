function subsetsWithDup(nums: number[]): number[][] {
    // Sorted copy leaves the caller's array untouched; sorting makes each
    // branch choose among the remaining values in ascending order, so the
    // subsets emerge in the pinned ascending lexicographic order.
    const values: number[] = [...nums].sort((a, b) => a - b);
    const subsets: number[][] = [];
    const current: number[] = [];
    const backtrack = (start: number): void => {
        // Every node of the walk is itself a subset: the root is [].
        subsets.push([...current]);
        for (let i = start; i < values.length; i++) {
            // A value equal to the sibling just tried at this level would
            // rebuild the same subset, so skip runs of equal values: a
            // duplicate may only open a branch as the first of its run.
            if (i > start && values[i] === values[i - 1]) continue;
            current.push(values[i]);
            backtrack(i + 1);
            current.pop();
        }
    };
    backtrack(0);
    return subsets;
}
