/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function (expression) {
    const parse = (index) => {
        const ch = expression[index];
        if (ch === "t") {
            return [true, index + 1];
        }
        if (ch === "f") {
            return [false, index + 1];
        }
        const op = ch;
        index += 2; // skip the operator and '('
        const values = [];
        for (;;) {
            let value;
            [value, index] = parse(index);
            values.push(value);
            if (expression[index] === ",") {
                index += 1;
            } else {
                // ')'
                index += 1;
                break;
            }
        }
        if (op === "!") {
            return [!values[0], index];
        }
        if (op === "&") {
            return [values.every(Boolean), index];
        }
        return [values.some(Boolean), index];
    };
    return parse(0)[0];
};
