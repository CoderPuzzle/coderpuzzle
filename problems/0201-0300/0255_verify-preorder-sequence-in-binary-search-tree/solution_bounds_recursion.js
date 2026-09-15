/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function (preorder) {
    // Each recursive call charges one node with the open interval (low,
    // high) its ancestors stake out — the search-tree property confines
    // every node to that interval. A claimed value tightens the interval
    // for the left call to (low, value) and for the right call to
    // (value, high), and the cursor is shared, so a value one interval
    // rejects waits in place for the ancestor that still admits it.
    let cursor = 0;

    function walk(low, high) {
        if (cursor === preorder.length) return;
        const value = preorder[cursor];
        // Outside the interval there is no legal slot this deep: the value
        // waits under the cursor for an ancestor whose interval admits it.
        if (value <= low || value >= high) return;
        // Preorder emits a node, then its whole left side, then its right
        // side, so the left call runs first and lines the recursion up
        // with the array.
        cursor++;
        walk(low, value);
        walk(value, high);
    }

    walk(-Infinity, Infinity);
    // Every value claimed is every value placed in the one slot the
    // ordering rules leave open.
    return cursor === preorder.length;
};
