/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function (n) {
    // Simulate the forced play: removal sizes drop 10, 9, 8, ... and
    // whoever faces a pile smaller than their removal size loses.
    let aliceToMove = true;
    let take = 10;
    while (n >= take) {
        n -= take;
        take--;
        aliceToMove = !aliceToMove;
    }
    return !aliceToMove;
};
