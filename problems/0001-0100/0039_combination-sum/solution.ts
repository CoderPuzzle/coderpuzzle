function combinationSum(candidates: number[], target: number): number[][] {
    const results: number[][] = [];
    const path: number[] = [];

    const backtrack = (start: number, remaining: number): void => {
        // remaining = target minus the sum of the path so far; when it hits 0
        // the path is a valid combination, so record a copy before it mutates.
        if (remaining === 0) {
            results.push(path.slice());
            return;
        }
        // Loop from start onward: everything before start stays forbidden.
        for (let i = start; i < candidates.length; i++) {
            const value = candidates[i];
            // Oversized candidate: let the branch die now rather than one
            // layer deeper. A skip, not a break, since input is unsorted.
            if (value > remaining) continue;
            path.push(value);
            // Recurse with i, not i + 1: a candidate may be reused without
            // limit. This pins every combination to nondecreasing candidate
            // order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
            backtrack(i, remaining - value);
            path.pop();
        }
    };

    backtrack(0, target);
    return results;
}
