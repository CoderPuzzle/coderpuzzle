/**
 * @param {string} l
 * @param {string} r
 * @param {number} b
 * @return {number}
 */
var countNumbers = function (l, r, b) {
    const MOD = 1000000007;

    const strip = (s) => {
        const t = s.replace(/^0+/, "");
        return t.length > 0 ? t : "0";
    };

    const toBase = (s) => {
        s = strip(s);
        if (s === "0") return [0];
        const digits = [];
        while (s !== "0") {
            let carry = 0;
            let ns = "";
            for (const ch of s) {
                const v = carry * 10 + (ch.charCodeAt(0) - 48);
                ns += String.fromCharCode(48 + Math.floor(v / b));
                carry = v % b;
            }
            digits.push(carry);
            s = strip(ns);
        }
        digits.reverse();
        return digits;
    };

    const countUpTo = (s) => {
        const digits = toBase(s);
        const m = digits.length;
        // g[pos][last][tight][started]
        const g = Array.from({ length: m + 1 }, () =>
            Array.from({ length: b }, () => Array.from({ length: 2 }, () => new Array(2).fill(0))),
        );
        for (let last = 0; last < b; last++)
            for (let tight = 0; tight < 2; tight++)
                for (let started = 0; started < 2; started++) g[m][last][tight][started] = 1;
        for (let pos = m - 1; pos >= 0; pos--) {
            for (let last = 0; last < b; last++) {
                for (let tight = 0; tight < 2; tight++) {
                    for (let started = 0; started < 2; started++) {
                        const limit = tight === 1 ? digits[pos] : b - 1;
                        let res = 0;
                        for (let d = 0; d <= limit; d++) {
                            const nt = tight === 1 && d === limit ? 1 : 0;
                            if (started === 0) {
                                if (d === 0) res += g[pos + 1][0][nt][0];
                                else res += g[pos + 1][d][nt][1];
                            } else if (d >= last) {
                                res += g[pos + 1][d][nt][1];
                            }
                        }
                        g[pos][last][tight][started] = res % MOD;
                    }
                }
            }
        }
        return g[0][0][1][0];
    };

    const dec = (s) => {
        let allZero = true;
        for (const ch of s) if (ch !== "0") allZero = false;
        if (allZero) return null;
        const c = s.split("");
        let i = c.length - 1;
        while (i >= 0) {
            if (c[i] > "0") {
                c[i] = String.fromCharCode(c[i].charCodeAt(0) - 1);
                break;
            }
            c[i] = "9";
            i--;
        }
        return strip(c.join(""));
    };

    const d = dec(l);
    const below = d === null ? 0 : countUpTo(d);
    return (((countUpTo(r) - below) % MOD) + MOD) % MOD;
};
