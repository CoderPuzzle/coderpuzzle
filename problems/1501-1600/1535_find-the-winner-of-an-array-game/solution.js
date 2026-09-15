/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var getWinner = function (arr, k) {
    // Track the running champion and its win streak in a single left-to-
    // right pass; this reproduces the same sequence of wins the literal
    // move-loser-to-the-back simulation would produce.
    let champion = arr[0];
    let streak = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > champion) {
            champion = arr[i];
            streak = 1;
        } else {
            streak++;
        }
        if (streak >= k) {
            return champion;
        }
    }
    return champion;
};
