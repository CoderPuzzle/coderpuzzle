/**
 * @param {number} x
 * @param {number} y
 * @return {string}
 */
var winningPlayer = function (x, y) {
    // 75a + 10b = 115 has the single non-negative solution a=1, b=4
    // (15a + 2b = 23 forces a odd and a < 2), so every move is forced:
    // one 75-coin and four 10-coins off the table, no choices to weigh.
    // Play therefore lasts exactly min(x, floor(y / 4)) moves; the player
    // who cannot move loses, so Alice wins iff she makes the last move.
    return Math.min(x, Math.floor(y / 4)) % 2 === 1 ? "Alice" : "Bob";
};
