/**
 * @param {number[]} possible
 * @return {number}
 */
var minimumLevels = function (possible) {
    // Map cleared levels to +1 and failed ones to -1. A split after t
    // levels wins exactly when 2 * prefix(t) > total: Alice's points are
    // her prefix sum, Bob's the remaining suffix, and she ends strictly
    // ahead iff the two differ by more than zero in either direction.
    let total = 0;
    for (const value of possible) {
        total += value === 1 ? 1 : -1;
    }
    let prefix = 0;
    // Scan splits ascending; Bob must play at least one level, so the
    // loop stops one short of the last element.
    for (let i = 0; i < possible.length - 1; ++i) {
        prefix += possible[i] === 1 ? 1 : -1;
        if (2 * prefix > total) return i + 1;
    }
    return -1;
};
