function buildAndEvaluate(s: string): number {
    let pos = 0;

    function parseExpr(): number {
        let value = parseTerm();
        while (pos < s.length && (s[pos] === "+" || s[pos] === "-")) {
            const op = s[pos];
            pos++;
            const rhs = parseTerm();
            value = op === "+" ? value + rhs : value - rhs;
        }
        return value;
    }

    function parseTerm(): number {
        let value = parseFactor();
        while (pos < s.length && (s[pos] === "*" || s[pos] === "/")) {
            const op = s[pos];
            pos++;
            const rhs = parseFactor();
            value = op === "*" ? value * rhs : Math.trunc(value / rhs);
        }
        return value;
    }

    function parseFactor(): number {
        if (s[pos] === "(") {
            pos++;
            const value = parseExpr();
            pos++; // skip ')'
            return value;
        }
        const value = s.charCodeAt(pos) - "0".charCodeAt(0);
        pos++;
        return value;
    }

    return parseExpr();
}
