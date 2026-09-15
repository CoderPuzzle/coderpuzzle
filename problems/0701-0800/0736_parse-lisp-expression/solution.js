/**
 * @param {string} expression
 * @return {number}
 */
var evaluate = function (expression) {
    const tokens = expression.replace(/\(/g, " ( ").replace(/\)/g, " ) ").trim().split(/\s+/);

    const isVar = (t) => {
        const c = t.charAt(0);
        return c >= "a" && c <= "z";
    };

    // A token at position i starts the final expression of a let iff it is
    // "(...", a literal, or a variable immediately followed by ")".
    const exprStart = (i) => {
        const t = tokens[i];
        if (t === "(" || !isVar(t)) return true;
        return tokens[i + 1] === ")";
    };

    const parse = (i, env) => {
        const token = tokens[i];
        if (token !== "(") {
            if (isVar(token)) return [env.get(token), i + 1];
            return [parseInt(token, 10), i + 1];
        }
        const op = tokens[i + 1];
        i += 2;
        if (op === "add" || op === "mult") {
            const [a, i1] = parse(i, env);
            const [b, i2] = parse(i1, env);
            return [op === "add" ? a + b : a * b, i2 + 1];
        }
        // let
        const local = new Map(env);
        let value = 0;
        while (tokens[i] !== ")") {
            if (exprStart(i)) {
                const [v, ni] = parse(i, local);
                value = v;
                i = ni;
            } else {
                const vr = tokens[i];
                const [v, ni] = parse(i + 1, local);
                value = v;
                i = ni;
                local.set(vr, v);
            }
        }
        return [value, i + 1];
    };

    const [result] = parse(0, new Map());
    return result;
};
