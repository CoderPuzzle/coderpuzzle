function calculate(s: string): number {
    // Only + and - appear, so the whole expression reduces to summing signed
    // terms: `result` is the running sum, `sign` the pending sign of the next
    // term, `num` the multi-digit number being assembled.
    let result = 0;
    let sign = 1;
    let num = 0;
    const stack: number[] = [];
    for (const ch of s) {
        if (ch >= "0" && ch <= "9") {
            num = num * 10 + (ch.charCodeAt(0) - 48);
        } else if (ch === "+") {
            // Fold the finished term in and record the next sign.
            result += sign * num;
            num = 0;
            sign = 1;
        } else if (ch === "-") {
            // A leading '-' needs no special casing: it simply leaves
            // sign = -1 for the next term or group.
            result += sign * num;
            num = 0;
            sign = -1;
        } else if (ch === "(") {
            // Save the outer context and evaluate the group afresh.
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (ch === ")") {
            result += sign * num;
            num = 0;
            // sign was pushed last, so it pops first: apply it to the inner
            // value and add the saved outer result back.
            result = result * stack.pop()! + stack.pop()!;
        }
        // spaces are ignored
    }
    // Fold in the final pending term.
    return result + sign * num;
}
