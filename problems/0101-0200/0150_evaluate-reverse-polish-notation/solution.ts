function evalRPN(tokens: string[]): number {
    // Stack machine: operands wait on the stack until an operator arrives,
    // pops its two operands -- the second pop is the left one -- and pushes
    // the result of applying itself.
    const stack: number[] = [];
    for (const token of tokens) {
        if (token === "+" || token === "-" || token === "*" || token === "/") {
            const b = stack.pop() as number;
            const a = stack.pop() as number;
            if (token === "+") {
                stack.push(a + b);
            } else if (token === "-") {
                stack.push(a - b);
            } else if (token === "*") {
                stack.push(a * b);
            } else {
                // Division truncates toward zero. Math.floor would round -7/2
                // down to -4, so floor the absolute quotient and reapply the
                // sign instead.
                const quotient = Math.floor(Math.abs(a) / Math.abs(b));
                stack.push(a < 0 === b < 0 ? quotient : -quotient);
            }
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0] as number;
}
