function addOperators(num: string, target: number): string[] {
    const n = num.length;
    const results: string[] = [];

    // num.length <= 10, so every operand is < 1e10 and any run of '*'
    // operands stays under ~1e10; the running total never exceeds ~1e11,
    // well within exact double range.
    // current is the expression's value so far; prev is the trailing
    // multiplicand chain that a later '*' binds to, not all of current.
    const dfs = (index: number, prev: number, current: number, expression: string): void => {
        if (index === n) {
            // The evaluation travels with the search: one comparison.
            if (current === target) {
                results.push(expression);
            }
            return;
        }
        // Each gap decides how far the operand extends, then the operator.
        for (let end = index; end < n; end++) {
            // A '0' at num[index] admits only the single-digit operand 0
            // (lone 0 legal, 01 not), so stop extending.
            if (end !== index && num[index] === "0") {
                break;
            }
            const nxt = parseInt(num.slice(index, end + 1), 10);
            if (index === 0) {
                // The first operand seeds both the running total and the
                // trailing multiplicand chain.
                dfs(end + 1, nxt, nxt, String(nxt));
            } else {
                // '+'/'-' fold nxt straight into current; the chain resets
                // to nxt (or -nxt so a later '*' reverses the subtraction).
                dfs(end + 1, nxt, current + nxt, expression + "+" + nxt);
                dfs(end + 1, -nxt, current - nxt, expression + "-" + nxt);
                // '*' rewrites the tail in place: drop the chain's old
                // contribution, add prev * nxt.
                dfs(end + 1, prev * nxt, current - prev + prev * nxt, expression + "*" + nxt);
            }
        }
    };

    dfs(0, 0, 0, "");
    return results;
}
