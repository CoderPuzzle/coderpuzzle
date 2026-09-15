/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
    const friends = [];
    for (let i = 1; i <= n; i++) friends.push(i);
    // idx marks where the next count starts (friend 1 for the first round).
    let idx = 0;
    while (friends.length > 1) {
        // -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
        idx = (idx + k - 1) % friends.length;
        // The clockwise neighbor shifts into the vacated slot, so idx already
        // points at where the next count must begin — no extra adjustment needed.
        friends.splice(idx, 1);
    }
    return friends[0];
};
