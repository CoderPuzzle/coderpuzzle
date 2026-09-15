/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    const n = s.length;
    let i = 0;

    function expr() {
        let value = term();
        while (i < n && (s[i] === "+" || s[i] === "-")) {
            const op = s[i];
            i++;
            const rhs = term();
            value = op === "+" ? value + rhs : value - rhs;
        }
        return value;
    }

    function term() {
        let value = factor();
        while (i < n && (s[i] === "*" || s[i] === "/")) {
            const op = s[i];
            i++;
            const rhs = factor();
            if (op === "*") {
                value *= rhs;
            } else {
                value = Math.trunc(value / rhs);
            }
        }
        return value;
    }

    function factor() {
        if (s[i] === "(") {
            i++;
            const value = expr();
            i++; // closing ")"
            return value;
        }
        let value = 0;
        while (i < n && s[i] >= "0" && s[i] <= "9") {
            value = value * 10 + (s.charCodeAt(i) - 48);
            i++;
        }
        return value;
    }

    return expr();
};
