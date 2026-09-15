/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
    // One piece can hold at most n - numFriends + 1 letters (the other
    // numFriends - 1 pieces need one each), and for numFriends > 1 every
    // such capped slice really is a piece of some split, so the box's
    // maximum is the largest capped slice over all start positions.
    if (numFriends === 1) {
        return word;
    }
    const limit = word.length - numFriends + 1;
    let best = "";
    for (let i = 0; i < word.length; i++) {
        const candidate = word.slice(i, i + limit);
        if (candidate > best) {
            best = candidate;
        }
    }
    return best;
};
