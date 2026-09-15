/**
 * @param {string} s
 * @return {number}
 */
var minimumLength = function (s) {
    // Each operation deletes two copies of one letter — the closest
    // same-letter occurrences on either side of a pivot — so every
    // letter's count keeps its parity while pairs keep coming off.
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        counts[s.charCodeAt(i) - 97]++;
    }
    // A letter with three or more copies always has a usable pivot, so
    // it reduces to one copy when odd and two when even; letters below
    // three are already stuck there.
    let total = 0;
    for (const count of counts) {
        if (count === 0) {
            continue;
        }
        total += count % 2 === 1 ? 1 : 2;
    }
    return total;
};
