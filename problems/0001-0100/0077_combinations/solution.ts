function combine(n: number, k: number): number[][] {
    const combinations: number[][] = [];
    const current: number[] = [];
    // Ascending start values make each combination ascending and the walk
    // emit lexicographic order directly.
    const walk = (start: number): void => {
        // A full pick of k numbers is one combination.
        if (current.length === k) {
            // Copy: current is the shared buffer for the next branch.
            combinations.push([...current]);
            return;
        }
        // The bound keeps only values that leave enough larger numbers to
        // fill the rest of the combination.
        const last = n - (k - current.length) + 1;
        for (let value = start; value <= last; ++value) {
            current.push(value);
            walk(value + 1);
            current.pop();
        }
    };
    walk(1);
    return combinations;
}
