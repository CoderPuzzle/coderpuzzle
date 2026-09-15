function calculate(s: string): number {
    // The expression is a plain sum of terms, each term a maximal chain of
    // */ : defer the additions and apply the operator that PRECEDED the
    // number just read, keeping fully evaluated terms on a stack.
    const stack: number[] = [];
    let num = 0;
    let op = "+";
    const last = s.length - 1;
    for (let i = 0; i <= last; i++) {
        const ch = s[i];
        if (ch >= "0" && ch <= "9") {
            num = num * 10 + (ch.charCodeAt(0) - 48);
        }
        // Two separate ifs: a digit in the last position must both extend num
        // and trigger the final flush (else-if would drop the last term).
        if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || i === last) {
            if (op === "+") {
                stack.push(num);
            } else if (op === "-") {
                stack.push(-num);
            } else if (op === "*") {
                // */ combines with the term currently on top.
                stack.push(stack.pop()! * num);
            } else {
                // Math.trunc gives the required toward-zero division.
                const prev = stack.pop()!;
                stack.push(Math.trunc(prev / num));
            }
            op = ch;
            num = 0;
        }
    }
    // The answer is the sum of the deferred terms.
    let total = 0;
    for (const value of stack) {
        total += value;
    }
    return total;
}
