/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
var movesToStamp = function (stamp, target) {
    // Work backwards from target, where stamping forwards becomes erasing: a
    // window is erasable once every character in it either equals its stamp
    // counterpart or is already '?', because the last stamp to cover a
    // position always leaves the stamp's own letter there. Each round takes
    // the leftmost erasable window that still contains a letter — erasing it
    // can never block the remaining windows, since turning letters into '?'
    // only widens what matches — and blanks it. A round that finds nothing
    // while letters remain proves the target unreachable; reversing the
    // recorded indices yields the stamping order.
    const m = stamp.length;
    const n = target.length;
    const s = target.split("");
    let remaining = n;
    const recorded = [];
    while (remaining > 0) {
        let found = -1;
        for (let i = 0; i + m <= n; i++) {
            let ok = true;
            let progress = false;
            for (let j = 0; j < m; j++) {
                const c = s[i + j];
                if (c === "?") {
                    continue;
                }
                if (c !== stamp[j]) {
                    ok = false;
                    break;
                }
                progress = true;
            }
            if (ok && progress) {
                found = i;
                break;
            }
        }
        if (found < 0) {
            return [];
        }
        for (let j = 0; j < m; j++) {
            if (s[found + j] !== "?") {
                s[found + j] = "?";
                remaining--;
            }
        }
        recorded.push(found);
    }
    return recorded.reverse();
};
