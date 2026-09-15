function buildAndEvaluate(postfix: string[]): number {
    const stack: number[] = [];
    for (const tok of postfix) {
        if (tok.length === 1 && (tok === "+" || tok === "-" || tok === "*" || tok === "/")) {
            const b = stack.pop() as number;
            const a = stack.pop() as number;
            let value: number;
            if (tok === "+") {
                value = a + b;
            } else if (tok === "-") {
                value = a - b;
            } else if (tok === "*") {
                value = a * b;
            } else {
                value = Math.trunc(a / b);
            }
            stack.push(value);
        } else {
            stack.push(parseInt(tok, 10));
        }
    }
    return stack[stack.length - 1];
}
