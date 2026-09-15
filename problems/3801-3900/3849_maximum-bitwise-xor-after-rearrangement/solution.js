/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var maximumXor = function (s, t) {
    const n = s.length;
    let sOnes = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === "1") {
            sOnes++;
        }
    }
    let tOnes = 0;
    for (let i = 0; i < n; i++) {
        if (t[i] === "1") {
            tOnes++;
        }
    }
    // Ones of t that can land on s's '0' positions and zeros of t that
    // can land on s's '1' positions — the largest pair of opposite-bit
    // counts the two multisets allow, maxed together.
    let onesOnZeros = Math.min(tOnes, n - sOnes);
    let zerosOnOnes = Math.min(n - tOnes, sOnes);
    // Greedy left-to-right fill: spend an opposite bit at each position
    // while its class still has one, which pushes every achievable XOR
    // one as far left as it can go.
    const out = [];
    for (let i = 0; i < n; i++) {
        if (s[i] === "0") {
            if (onesOnZeros > 0) {
                out.push("1");
                onesOnZeros--;
            } else {
                out.push("0");
            }
        } else if (zerosOnOnes > 0) {
            out.push("1");
            zerosOnOnes--;
        } else {
            out.push("0");
        }
    }
    return out.join("");
};
