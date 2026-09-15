function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    const current: string[] = [];
    const backtrack = (openCount: number, closeCount: number): void => {
        // Under the two guards below every leaf reached at length 2n is
        // well-formed by construction, so nothing needs re-validating.
        if (current.length === 2 * n) {
            result.push(current.join(""));
            return;
        }
        // Try "(" first ("(" < ")") so leaves emerge in lexicographic order;
        // it is allowed while fewer than n openings are placed.
        if (openCount < n) {
            // Push, recurse, pop: one shared array is the working storage
            // for the whole tree.
            current.push("(");
            backtrack(openCount + 1, closeCount);
            current.pop();
        }
        // ")" only while closings still trail openings -- appending it can
        // never make the prefix invalid.
        if (closeCount < openCount) {
            current.push(")");
            backtrack(openCount, closeCount + 1);
            current.pop();
        }
    };
    backtrack(0, 0);
    return result;
}
