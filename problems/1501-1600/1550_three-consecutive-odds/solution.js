/**
 * @param {number[]} arr
 * @return {boolean}
 */
var threeConsecutiveOdds = function (arr) {
    // Track a running streak of consecutive odd values; any even value
    // resets it. Three in a row settles the answer immediately.
    let streak = 0;
    for (const value of arr) {
        if (value % 2 !== 0) {
            streak++;
            if (streak >= 3) {
                return true;
            }
        } else {
            streak = 0;
        }
    }
    return false;
};
