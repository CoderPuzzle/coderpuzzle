/**
 * @param {number} n
 * @return {boolean}
 */
var findGameWinner = function (n) {
    let twoBack = 0;
    let oneBack = 0;
    let childXor = 0;

    for (let order = 1; order <= n; ++order) {
        childXor = twoBack ^ oneBack;
        const current = 1 + childXor;
        twoBack = oneBack;
        oneBack = current;
    }

    return childXor !== 0;
};
