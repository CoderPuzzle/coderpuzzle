/**
 * @param {string} expression
 * @return {number}
 */
var evaluateExpression = function (expression) {
    // One recursive parse returning [value, next index] covers the grammar;
    // the leading character picks the branch.
    function parse(i) {
        const ch = expression[i];
        // A digit or '-' starts a literal: optional sign, then digits.
        if (ch === "-" || (ch >= "0" && ch <= "9")) {
            let j = ch === "-" ? i + 1 : i;
            while (j < expression.length && expression[j] >= "0" && expression[j] <= "9") {
                j++;
            }
            return [parseInt(expression.slice(i, j), 10), j];
        }
        // Otherwise a three-letter operator; +4 lands just past "op(". Each
        // nested call's returned index + 1 hops the "," / ")" separator.
        const op = expression.slice(i, i + 3);
        i += 4;
        const r1 = parse(i);
        const r2 = parse(r1[1] + 1);
        // Combine the two sub-results as the recursion unwinds; truncating
        // division agrees with floor division on exact quotients.
        let v;
        if (op === "add") v = r1[0] + r2[0];
        else if (op === "sub") v = r1[0] - r2[0];
        else if (op === "mul") v = r1[0] * r2[0];
        else v = Math.trunc(r1[0] / r2[0]);
        return [v, r2[1] + 1];
    }
    return parse(0)[0];
};
