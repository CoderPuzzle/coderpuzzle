/**
 * @param {string[]} strs
 * @return {string}
 */
var splitLoopedString = function (strs) {
    // Every string except the breakpoint carrier stands at max(s, s
    // reversed) - fixed slot lengths make per-string maxima optimal. The
    // breakpoint string itself is tried in BOTH orientations at every cut,
    // its suffix leading the regular string and its prefix closing it,
    // wrapped around the others' standing forms in loop order.
    const n = strs.length;
    const best = strs.map((s) => {
        const rev = s.split("").reverse().join("");
        return s >= rev ? s : rev;
    });
    let ans = "";
    for (let i = 0; i < n; ++i) {
        const rest = [];
        for (let j = 1; j < n; ++j) {
            rest.push(best[(i + j) % n]);
        }
        const others = rest.join("");
        for (const t of [strs[i], strs[i].split("").reverse().join("")]) {
            for (let k = 0; k < t.length; ++k) {
                const cand = t.slice(k) + others + t.slice(0, k);
                if (cand > ans) {
                    ans = cand;
                }
            }
        }
    }
    return ans;
};
