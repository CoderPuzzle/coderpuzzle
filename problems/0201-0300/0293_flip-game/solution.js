/**
 * @param {string} currentState
 * @return {string[]}
 */
var generatePossibleNextMoves = function (currentState) {
    const states = [];
    // One left-to-right scan: every position whose two characters are
    // both '+' is exactly one legal move, and ascending i emits the
    // states in the pinned order — the earlier flipped pair first.
    for (let i = 0; i + 1 < currentState.length; ++i) {
        if (currentState[i] === "+" && currentState[i + 1] === "+") {
            // Keep both ends of the string, burn only the pair.
            states.push(currentState.slice(0, i) + "--" + currentState.slice(i + 2));
        }
    }
    // A string with no "++" anywhere leaves the list empty — no valid move.
    return states;
};
