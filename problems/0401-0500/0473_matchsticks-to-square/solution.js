/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
    let total = 0;
    for (const v of matchsticks) total += v;
    // A square is 4 equal-length groups: the total must split evenly and
    // no single stick may exceed the side.
    if (total % 4 !== 0) return false;
    const side = total / 4;
    // Descending order places the most constrained sticks first, so a dead
    // end appears after only a few branches.
    const sticks = matchsticks.slice().sort((a, b) => b - a);
    if (sticks.length === 0 || sticks[0] > side) return false;
    const sides = [0, 0, 0, 0];

    function dfs(i) {
        if (i === sticks.length) {
            // Guaranteed by the capacity checks + total = 4 * side; kept
            // as a final safety assertion.
            return sides[0] === side && sides[1] === side && sides[2] === side && sides[3] === side;
        }
        const value = sticks[i];
        const tried = new Set();
        for (let j = 0; j < 4; j++) {
            // Sides with equal current length are interchangeable — trying
            // one per distinct length skips symmetric states.
            if (tried.has(sides[j])) continue;
            tried.add(sides[j]);
            // Place/recurse/undo on every side with room left.
            if (sides[j] + value <= side) {
                sides[j] += value;
                if (dfs(i + 1)) return true;
                sides[j] -= value;
            }
        }
        return false;
    }

    return dfs(0);
};
