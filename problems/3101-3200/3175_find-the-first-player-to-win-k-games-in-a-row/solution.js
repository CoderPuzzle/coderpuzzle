/**
 * @param {number[]} skills
 * @param {number} k
 * @return {number}
 */
var findWinningPlayer = function (skills, k) {
    // Challengers arrive in index order exactly as in the queue, so one
    // king-of-the-hill pass reproduces every game until someone hits k
    // wins. If no one does by then the champion holds the global top
    // skill and can never lose again.
    let idx = 0;
    let wins = 0;
    for (let i = 1; i < skills.length; ++i) {
        if (skills[i] > skills[idx]) {
            idx = i;
            wins = 1;
        } else {
            ++wins;
        }
        if (wins === k) {
            return idx;
        }
    }
    return idx;
};
