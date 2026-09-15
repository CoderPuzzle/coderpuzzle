function permute(n: number): number[][] {
    const results: number[][] = [];
    const current: number[] = [];
    // One flag per value: each of 1..n is consumed at most once per
    // permutation, cleared again on the way back up.
    const used: boolean[] = new Array(n + 1).fill(false);
    const walk = (): void => {
        // Every position filled: snapshot the finished permutation.
        if (current.length === n) {
            // Copy: current is the shared buffer for the next branch.
            results.push([...current]);
            return;
        }
        // Ascending candidates make the walk emit lexicographic order
        // directly; the parity test prunes a branch the moment it would
        // place two adjacent elements both odd or both even.
        for (let value = 1; value <= n; ++value) {
            if (used[value]) continue;
            if (current.length > 0 && value % 2 === current[current.length - 1] % 2) continue;
            used[value] = true;
            current.push(value);
            walk();
            current.pop();
            used[value] = false;
        }
    };
    walk();
    return results;
}
