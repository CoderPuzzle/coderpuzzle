function diffWaysToCompute(expression: string): number[] {
    // Every operator takes its turn as the root of the expression tree, so
    // each split contributes the cross product of the values its two sides
    // can produce; a range without an operator is a single operand whose
    // only grouping is the number itself.
    const values = (lo: number, hi: number): number[] => {
        const results: number[] = [];
        let split = false;
        for (let i = lo; i < hi; ++i) {
            const op = expression[i];
            if (op !== "+" && op !== "-" && op !== "*") {
                continue;
            }
            split = true;
            for (const left of values(lo, i)) {
                for (const right of values(i + 1, hi)) {
                    if (op === "+") {
                        results.push(left + right);
                    } else if (op === "-") {
                        results.push(left - right);
                    } else {
                        results.push(left * right);
                    }
                }
            }
        }
        if (!split) {
            results.push(Number(expression.slice(lo, hi)));
        }
        return results;
    };
    // The recursion emits each root operator's cross products in string
    // order; one ascending sort turns that into the pinned order, and
    // nothing dedupes, so equal values from different groupings survive.
    // The comparator is numeric — the default sort would compare strings.
    return values(0, expression.length).sort((a, b) => a - b);
}
