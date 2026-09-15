/**
 * @param {number} n
 * @param {number[][]} pick
 * @return {number}
 */
var winningPlayerCount = function (n, pick) {
    const counts = Array.from({ length: n }, () => new Array(11).fill(0));
    for (const [player, color] of pick) {
        counts[player][color]++;
    }

    let winners = 0;
    for (let player = 0; player < n; player++) {
        if (Math.max(...counts[player]) > player) {
            winners++;
        }
    }
    return winners;
};
