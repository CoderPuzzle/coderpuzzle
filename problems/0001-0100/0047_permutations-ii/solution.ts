function permuteUnique(nums: number[]): number[][] {
    // Sorted copy leaves the caller's array untouched; sorting makes every
    // position choose among the remaining values in ascending order, so the
    // finished permutations emerge in lexicographic order.
    const arr = [...nums].sort((a, b) => a - b);
    const permutations: number[][] = [];
    const current: number[] = [];
    // One flag per slot: each element is consumed at most once per
    // permutation, cleared again on the way back up.
    const used: boolean[] = new Array(arr.length).fill(false);
    const backtrack = (): void => {
        if (current.length === arr.length) {
            // Every position filled: snapshot the finished permutation.
            permutations.push([...current]);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            // A value equal to the one just abandoned at this depth would
            // rebuild the same permutation, so skip runs of equal values: a
            // duplicate may only be placed once its left twin is used.
            if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            current.push(arr[i]);
            backtrack();
            current.pop();
            used[i] = false;
        }
    };
    backtrack();
    return permutations;
}
