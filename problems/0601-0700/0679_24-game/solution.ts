// Backtracking over the multiset of remaining values. Any expression tree
// evaluates bottom-up by combining two siblings at a time, so taking each
// unordered pair, applying every operator (both orders for '-' and '/'),
// and recursing on the shorter array explores every expression exactly.
// Real division makes exact equality untestable in floating point, so a
// lone remaining value wins when it sits within EPS of 24.
function judgePoint24(cards: number[]): boolean {
    function solve(values: number[]): boolean {
        if (values.length === 1) {
            return Math.abs(values[0] - 24.0) < 1e-6;
        }
        const n = values.length;
        for (let i = 0; i < n; i += 1) {
            for (let j = i + 1; j < n; j += 1) {
                const a = values[i];
                const b = values[j];
                const rest: number[] = [];
                for (let k = 0; k < n; k += 1) {
                    if (k !== i && k !== j) {
                        rest.push(values[k]);
                    }
                }
                const results = [a + b, a - b, b - a, a * b];
                if (b !== 0) {
                    results.push(a / b);
                }
                if (a !== 0) {
                    results.push(b / a);
                }
                for (const result of results) {
                    if (solve([...rest, result])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    return solve(cards);
}
