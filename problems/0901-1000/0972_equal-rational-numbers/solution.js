/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isRationalEqual = function (s, t) {
    // Two notations name the same number exactly when their exact rational
    // values coincide. Parse each string into an integer part plus an exact
    // fraction: with a repeating part, the fractional value is
    // (int(nonrep + rep) - int(nonrep)) over 10^len(nonrep) * (10^len(rep) - 1);
    // without one, int(nonrep) over 10^len(nonrep). A numerator equal to the
    // denominator is the all-trailing-9s carry — 0.9(9) is exactly 1 — so it
    // rolls into the integer part. Parts are at most four digits, so numerator
    // and denominator stay below 10^8 and the cross product below 10^16 —
    // past Number's exact 2^53 ceiling, hence BigInt for the comparison.
    function fraction(x) {
        const [integer, rest = ""] = x.split(".");
        const [nonRep, withParen = ""] = rest.split("(");
        const rep = withParen.slice(0, -1); // drop the ')'
        const base = 10 ** nonRep.length;
        let numerator, denominator;
        if (rep === "") {
            numerator = Number(nonRep);
            denominator = base;
        } else {
            numerator = Number(nonRep + rep) - Number(nonRep);
            denominator = base * (10 ** rep.length - 1);
        }
        let whole = Number(integer);
        if (numerator === denominator) {
            // 0.9(9) carries into the whole part
            whole++;
            numerator = 0;
            denominator = 1;
        }
        return [whole, numerator, denominator];
    }
    const [wholeS, numS, denS] = fraction(s);
    const [wholeT, numT, denT] = fraction(t);
    return wholeS === wholeT && BigInt(numS) * BigInt(denT) === BigInt(numT) * BigInt(denS);
};
