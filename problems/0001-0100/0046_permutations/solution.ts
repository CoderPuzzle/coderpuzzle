function permute(nums: number[]): number[][] {
    // Sorted copy leaves the caller's array untouched; trying candidates in
    // ascending order makes the walk emit lexicographic order directly.
    const values = [...nums].sort((a, b) => a - b);
    const permutations: number[][] = [];
    const current: number[] = [];
    const used = new Array<boolean>(values.length).fill(false);
    // A leaf has one chosen element per position: a full permutation.
    const walk = () => {
        if (current.length === values.length) {
            // Copy: current is the shared buffer for the next branch.
            permutations.push([...current]);
            return;
        }
        for (let index = 0; index < values.length; ++index) {
            // Marks replace an O(n) membership scan; skip taken elements.
            if (used[index]) continue;
            used[index] = true;
            current.push(values[index]);
            walk();
            current.pop();
            used[index] = false;
        }
    };
    walk();
    return permutations;
}
