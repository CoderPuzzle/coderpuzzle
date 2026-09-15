function basicCalculatorIV(expression: string, evalvars: string[], evalints: number[]): string[] {
    // One scan, two stacks: a stack of polynomials — each a map from a
    // term (its variables, sorted, joined by '*'; "" is the constant
    // term) to its coefficient — and a stack of pending operators.
    // Every operand pushes a one-term polynomial; a variable listed in
    // evalvars (or a number) becomes the constant term. '+' and '-'
    // drain every pending operator down to '(', '*' drains only '*',
    // and ')' drains to its matching '(' — precedence and brackets in
    // four rules. Multiplying pairs every term of both sides, merging
    // the two variable lists into one sorted list; adding merges
    // coefficients of equal terms. Zero terms drop out at the end,
    // where terms print degree-descending first and lexicographic
    // within a degree, coefficient left of its variables.
    const evalmap = new Map<string, number>();
    evalvars.forEach((name, index) => evalmap.set(name, evalints[index]));
    const polys: Map<string, number>[] = [];
    const ops: string[] = [];
    const splitTerm = (key: string): string[] => (key === "" ? [] : key.split("*"));
    const degree = (key: string): number => (key === "" ? 0 : key.split("*").length);
    const apply = () => {
        const op = ops.pop() as string;
        const right = polys.pop() as Map<string, number>;
        const left = polys.pop() as Map<string, number>;
        if (op === "*") {
            const product = new Map<string, number>();
            for (const [lkey, lcoef] of left) {
                const lvars = splitTerm(lkey);
                for (const [rkey, rcoef] of right) {
                    const key = [...lvars, ...splitTerm(rkey)].sort().join("*");
                    product.set(key, (product.get(key) ?? 0) + lcoef * rcoef);
                }
            }
            polys.push(product);
        } else {
            const sign = op === "+" ? 1 : -1;
            for (const [key, coef] of right) {
                left.set(key, (left.get(key) ?? 0) + sign * coef);
            }
            polys.push(left);
        }
    };
    let i = 0;
    while (i < expression.length) {
        const ch = expression[i];
        if (ch === " ") {
            i++;
        } else if (ch === "(") {
            ops.push(ch);
            i++;
        } else if (ch === ")") {
            while (ops[ops.length - 1] !== "(") {
                apply();
            }
            ops.pop();
            i++;
        } else if (ch === "+" || ch === "-" || ch === "*") {
            while (ops.length > 0) {
                const top = ops[ops.length - 1];
                if (ch === "*" ? top !== "*" : top === "(") {
                    break;
                }
                apply();
            }
            ops.push(ch);
            i++;
        } else {
            let j = i;
            while (
                j < expression.length &&
                ((expression[j] >= "a" && expression[j] <= "z") || (expression[j] >= "0" && expression[j] <= "9"))
            ) {
                j++;
            }
            const token = expression.slice(i, j);
            const poly = new Map<string, number>();
            if (token[0] >= "0" && token[0] <= "9") {
                poly.set("", Number(token));
            } else if (evalmap.has(token)) {
                poly.set("", evalmap.get(token) as number);
            } else {
                poly.set(token, 1);
            }
            polys.push(poly);
            i = j;
        }
    }
    while (ops.length > 0) {
        apply();
    }
    const result = polys[0];
    const terms = [...result.entries()].filter(([, coef]) => coef !== 0);
    terms.sort((a, b) => {
        const byDegree = degree(b[0]) - degree(a[0]);
        if (byDegree !== 0) {
            return byDegree;
        }
        return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
    });
    return terms.map(([key, coef]) => (key === "" ? String(coef) : `${coef}*${key}`));
}
