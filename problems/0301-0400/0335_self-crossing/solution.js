/**
 * @param {number[]} distance
 * @return {boolean}
 */
var isSelfCrossing = function (distance) {
    // A crossing shows up the moment it happens, and a new line can only
    // reach lines three, four, or five moves back — so one forward scan
    // with a three-case window on the last six distances decides.
    const d = distance;
    for (let i = 3; i < d.length; ++i) {
        // Fourth line crosses the line three back; touching counts.
        const fourth = d[i] >= d[i - 2] && d[i - 1] <= d[i - 3];
        // Fourth line exactly touches the second; the fifth then
        // reaches back to meet or pass the first.
        const fifth = i >= 4 && d[i - 1] === d[i - 3] && d[i] + d[i - 4] >= d[i - 2];
        // Sixth line cuts inward far enough to close onto the first.
        const sixth =
            i >= 5 &&
            d[i - 2] >= d[i - 4] &&
            d[i - 3] >= d[i - 1] &&
            d[i - 1] + d[i - 5] >= d[i - 3] &&
            d[i] >= d[i - 2] - d[i - 4];
        if (fourth || fifth || sixth) return true;
    }
    return false;
};
