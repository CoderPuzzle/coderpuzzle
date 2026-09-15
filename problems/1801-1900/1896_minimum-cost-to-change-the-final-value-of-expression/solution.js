/**
 * @param {string} expression
 * @return {number}
 */
var minOperationsToFlip = function (expression) {
    function combine(a, b, op) {
        var va = a[0],
            ca = a[1];
        var vb = b[0],
            cb = b[1];
        var v, c;
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

    function evalSeq(values, ops) {
        var result = values[0];
        for (var i = 0; i < ops.length; i++) {
            result = combine(result, values[i + 1], ops[i]);
        }
        return result;
    }

    // stack items: { op: '(' | '&' | '|' } or { val: [value, cost] }
    var stack = [];
    for (var i = 0; i < expression.length; i++) {
        var ch = expression[i];
        if (ch === "(") {
            stack.push({ op: "(" });
        } else if (ch === "&" || ch === "|") {
            stack.push({ op: ch });
        } else if (ch === "0" || ch === "1") {
            stack.push({ val: [ch.charCodeAt(0) - 48, 1] });
        } else {
            // ')'
            var values = [];
            var ops = [];
            while (stack.length > 0 && !(stack[stack.length - 1].op === "(")) {
                var item = stack.pop();
                if (item.op !== undefined) {
                    ops.push(item.op);
                } else {
                    values.push(item.val);
                }
            }
            stack.pop(); // remove '('
            values.reverse();
            ops.reverse();
            stack.push({ val: evalSeq(values, ops) });
        }
    }
    var values2 = [];
    var ops2 = [];
    for (var j = 0; j < stack.length; j++) {
        var it = stack[j];
        if (it.op !== undefined) {
            ops2.push(it.op);
        } else {
            values2.push(it.val);
        }
    }
    return evalSeq(values2, ops2)[1];
};
