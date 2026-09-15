/**
 * @param {number[]} team
 * @param {number} dist
 * @return {number}
 */
var catchMaximumAmountofPeople = function (team, dist) {
    // Two-pointer greedy over the sorted "it" and "not it" positions: each
    // "it" catches the leftmost uncaught person within its reach.
    const it = [];
    const notIt = [];
    for (let i = 0; i < team.length; ++i) {
        (team[i] === 1 ? it : notIt).push(i);
    }
    let i = 0;
    let j = 0;
    let caught = 0;
    while (i < it.length && j < notIt.length) {
        if (notIt[j] < it[i] - dist) {
            // Too far left: every later "it" is further right, so this
            // person can never be caught; skip them.
            ++j;
        } else if (notIt[j] > it[i] + dist) {
            // Too far right for this "it": it can catch no one, move on.
            ++i;
        } else {
            ++caught;
            ++i;
            ++j;
        }
    }
    return caught;
};
