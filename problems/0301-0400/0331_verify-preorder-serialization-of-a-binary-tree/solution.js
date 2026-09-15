/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
    // slots counts tree positions still waiting to be filled — one for the
    // root at the start. Each token fills one slot; a number then opens two
    // more for its children, a '#' opens none. The serialization is valid
    // exactly when no token arrives after the slots run out and the last
    // token closes the last one, so no tree is ever built.
    let slots = 1;
    let i = 0;
    const n = preorder.length;
    while (i < n) {
        // A token with no open slot has nowhere to live: the tree this
        // string describes was already finished earlier.
        if (slots === 0) return false;
        --slots;
        // Only the first character of a token matters: a valid token is
        // either a number or the one-character '#'.
        const isNull = preorder[i] === "#";
        while (i < n && preorder[i] !== ",") ++i;
        // Step past the comma (harmless past the last token).
        ++i;
        if (!isNull) slots += 2;
    }
    return slots === 0;
};
