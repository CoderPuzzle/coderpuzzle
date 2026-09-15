class Solution {

    public boolean verifyPreorder(int[] preorder) {
        // Each recursive call charges one node with the open interval (low,
        // high) its ancestors stake out — the search-tree property confines
        // every node to that interval. A claimed value tightens the interval
        // for the left call to (low, value) and for the right call to
        // (value, high), and the cursor is shared, so a value one interval
        // rejects waits in place for the ancestor that still admits it.
        int[] cursor = { 0 };
        walk(preorder, cursor, Long.MIN_VALUE, Long.MAX_VALUE);
        // Every value claimed is every value placed in the one slot the
        // ordering rules leave open.
        return cursor[0] == preorder.length;
    }

    // The bounds are 64-bit: values reach the int extremes, and a 32-bit
    // sentinel would collide with a real boundary value.
    private void walk(int[] preorder, int[] cursor, long low, long high) {
        if (cursor[0] == preorder.length) return;
        int value = preorder[cursor[0]];
        // Outside the interval there is no legal slot this deep: the value
        // waits under the cursor for an ancestor whose interval admits it.
        if (value <= low || value >= high) return;
        // Preorder emits a node, then its whole left side, then its right
        // side, so the left call runs first and lines the recursion up
        // with the array.
        cursor[0]++;
        walk(preorder, cursor, low, value);
        walk(preorder, cursor, value, high);
    }
}
