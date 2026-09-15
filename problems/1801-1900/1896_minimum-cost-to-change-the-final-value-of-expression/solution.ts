function minOperationsToFlip(expression: string): number {
    function combine(a: number[], b: number[], op: string): number[] {
        const va = a[0],
            ca = a[1];
        const vb = b[0],
            cb = b[1];
        let v: number, c: number;
        if (op === "&") {
            v = va & vb;
            if (v === 0) {
                if (va === 0 && vb === 0) {
                    c = Math.min(ca, cb) + 1;
                } else if (va === 0) {
                    // 0 & 1
                    c = Math.min(ca, 1);
                } else {
                    // 1 & 0
                    c = Math.min(cb, 1);
                }
            } else {
                // 1 & 1
                c = Math.min(ca, cb);
            }
        } else {
            // '|'
            v = va | vb;
            if (v === 0) {
                // 0 | 0 -> flip one operand to 1
                c = Math.min(ca, cb);
            } else if (va === 0) {
                // 0 | 1 -> flip b to 0 or switch to '&'
                c = Math.min(cb, 1);
            } else if (vb === 0) {
                // 1 | 0 -> flip a to 0 or switch to '&'
                c = Math.min(ca, 1);
            } else {
                // 1 | 1 -> both must become 0, or flip one and switch to '&'
                c = Math.min(ca, cb) + 1;
            }
        }
        return [v, c];
    }

    function evalSeq(values: number[][], ops: string[]): number[] {
        let result = values[0];
        for (let i = 0; i < ops.length; i++) {
            result = combine(result, values[i + 1], ops[i]);
        }
        return result;
    }

    interface Item {
        op?: string;
        val?: number[];
    }
    const stack: Item[] = [];
    for (let i = 0; i < expression.length; i++) {
        const ch = expression[i];
        if (ch === "(") {
            stack.push({ op: "(" });
        } else if (ch === "&" || ch === "|") {
            stack.push({ op: ch });
        } else if (ch === "0" || ch === "1") {
            stack.push({ val: [ch.charCodeAt(0) - 48, 1] });
        } else {
            // ')'
            const values: number[][] = [];
            const ops: string[] = [];
            while (stack.length > 0 && stack[stack.length - 1].op !== "(") {
                const item = stack.pop()!;
                if (item.op !== undefined) {
                    ops.push(item.op);
                } else {
                    values.push(item.val!);
                }
            }
            stack.pop(); // remove '('
            values.reverse();
            ops.reverse();
            stack.push({ val: evalSeq(values, ops) });
        }
    }
    const values2: number[][] = [];
    const ops2: string[] = [];
    for (const it of stack) {
        if (it.op !== undefined) {
            ops2.push(it.op);
        } else {
            values2.push(it.val!);
        }
    }
    return evalSeq(values2, ops2)[1];
}
