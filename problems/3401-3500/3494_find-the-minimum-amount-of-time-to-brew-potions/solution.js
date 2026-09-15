/**
 * @param {number[]} skill
 * @param {number[]} mana
 * @return {number}
 */
var minTime = function (skill, mana) {
    // No waiting means a potion's passage is rigid: once potion j starts at
    // wizard 0 at time s_j, wizard i finishes it at exactly
    // s_j + mana[j] * pref[i], with pref[i] = skill[0] + ... + skill[i-1].
    // Wizard i accepts potion j only after finishing potion j-1, so the
    // earliest feasible starts obey, with prev = mana[j-1], cur = mana[j],
    //   s_j - s_{j-1} = max_i ( prev * skill[i] + (prev - cur) * pref[i] ),
    // and choosing each s_j minimally is globally optimal since every
    // constraint grows monotonically with earlier starts. The maximand is
    // the upper envelope of the lines skill[i] + t * pref[i] queried at
    // t = (prev - cur) / prev; pref is strictly increasing, so the hull
    // builds in one pass and each query binary-searches it with exact
    // integer cross-multiplications. Every gap is at most ~1.25 * 10^11 and
    // the accumulated time at most ~6.25 * 10^14 — both far below Number's
    // 2^53 ceiling for exact integers, so plain number arithmetic is exact.
    const n = skill.length;
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        pref[i + 1] = pref[i] + skill[i];
    }

    const hullS = [];
    const hullP = [];
    for (let i = 0; i < n; ++i) {
        // Pop the top line while it is never strictly above its
        // neighbours: skill >= 1 keeps every slope distinct.
        while (
            hullP.length >= 2 &&
            (hullS[hullS.length - 2] - skill[i]) * (hullP[hullP.length - 1] - hullP[hullP.length - 2]) <=
                (hullS[hullS.length - 2] - hullS[hullS.length - 1]) * (pref[i] - hullP[hullP.length - 2])
        ) {
            hullS.pop();
            hullP.pop();
        }
        hullS.push(skill[i]);
        hullP.push(pref[i]);
    }

    let total = 0;
    let previous = mana[0];
    for (let j = 1; j < mana.length; ++j) {
        const current = mana[j];
        const p = previous - current;
        const q = previous;
        // Line b beats line a at t = p/q iff q*(s_b - s_a) >= p*(p_a - p_b).
        let lo = 0;
        let hi = hullS.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (q * (hullS[mid + 1] - hullS[mid]) >= p * (hullP[mid] - hullP[mid + 1])) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        total += hullS[lo] * q + hullP[lo] * p;
        previous = current;
    }
    return total + pref[n] * mana[mana.length - 1];
};
