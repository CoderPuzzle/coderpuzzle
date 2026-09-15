/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function (s) {
    const n = s.length;
    const first = new Map();
    const last = new Map();
    for (let i = 0; i < n; ++i) {
        const c = s[i];
        if (!first.has(c)) first.set(c, i);
        last.set(c, i);
    }

    // Anchor a candidate at every position that is the first occurrence of
    // its character, then push `end` out to cover every character met
    // along the way. The expansion is a fixed point: it stops the moment
    // nothing inside [start, end] demands more room.
    const candidates = [];
    for (let i = 0; i < n; ++i) {
        const c0 = s[i];
        if (first.get(c0) !== i) continue;
        const start = i;
        let end = last.get(c0);
        let valid = true;
        for (let j = start; j <= end; ++j) {
            const c = s[j];
            if (first.get(c) < start) {
                // This character escapes to the left of the anchor, so no
                // substring starting at i can ever be valid.
                valid = false;
                break;
            }
            end = Math.max(end, last.get(c));
        }
        if (valid) candidates.push([start, end]);
    }

    // Classic activity-selection greedy: earliest-ending candidate first,
    // ties broken by length so a shorter, nested candidate is preferred
    // over the longer one that contains it.
    candidates.sort((a, b) => a[1] - b[1] || a[1] - a[0] - (b[1] - b[0]));

    const result = [];
    let prevEnd = -1;
    for (const [start, end] of candidates) {
        if (start > prevEnd) {
            result.push(s.slice(start, end + 1));
            prevEnd = end;
        }
    }
    return result;
};
