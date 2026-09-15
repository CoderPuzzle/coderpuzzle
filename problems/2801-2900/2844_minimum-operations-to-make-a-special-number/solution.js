/**
 * @param {string} num
 * @return {number}
 */
var minimumOperations = function (num) {
    // Only the last two surviving digits decide divisibility by 25:
    // the kept number is special exactly when its final pair reads
    // 00, 25, 50, or 75 — or when nothing survives, since both the
    // empty result and a lone '0' equal 0. Pick positions i < j for
    // that closing pair: every digit before i may be retained free
    // of charge because it never moves the mod-25 outcome, so the
    // bill is the j - i - 1 digits wedged between the pair plus the
    // n - 1 - j digits after it, totaling n - i - 2 — smallest when
    // i sits as far right as possible. Taking each ending's
    // rightmost second-digit slot j and then the nearest matching
    // first digit strictly left of j already maximizes i: every
    // candidate first digit lies left of that slot or the pair is
    // impossible. Fallbacks: retaining one lone '0' costs n - 1,
    // and wiping all digits costs n. With at most 100 digits the
    // counts are tiny.
    const n = num.length;
    const endings = ["00", "25", "50", "75"];
    let best = num.includes("0") ? n - 1 : n;
    for (const ending of endings) {
        let j = -1;
        for (let k = n - 1; k >= 1; k--) {
            if (num[k] === ending[1]) {
                j = k;
                break;
            }
        }
        if (j === -1) {
            continue;
        }
        let i = -1;
        for (let k = j - 1; k >= 0; k--) {
            if (num[k] === ending[0]) {
                i = k;
                break;
            }
        }
        if (i !== -1 && n - i - 2 < best) {
            best = n - i - 2;
        }
    }
    return best;
};
