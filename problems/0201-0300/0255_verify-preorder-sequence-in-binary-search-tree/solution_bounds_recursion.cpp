class Solution {
  public:
    bool verifyPreorder(vector<int> &preorder) {
        // Each recursive call charges one node with the open interval (low,
        // high) its ancestors stake out — the search-tree property confines
        // every node to that interval. A claimed value tightens the interval
        // for the left call to (low, value) and for the right call to
        // (value, high), and the cursor is shared, so a value one interval
        // rejects waits in place for the ancestor that still admits it.
        int cursor = 0;
        walk(preorder, cursor, LLONG_MIN, LLONG_MAX);
        // Every value claimed is every value placed in the one slot the
        // ordering rules leave open.
        return cursor == (int)preorder.size();
    }

  private:
    // The bounds are 64-bit: values reach the int extremes, and a 32-bit
    // sentinel would collide with a real boundary value.
    void walk(vector<int> &preorder, int &cursor, long long low, long long high) {
        if (cursor == (int)preorder.size())
            return;
        int value = preorder[cursor];
        // Outside the interval there is no legal slot this deep: the value
        // waits under the cursor for an ancestor whose interval admits it.
        if (value <= low || value >= high)
            return;
        // Preorder emits a node, then its whole left side, then its right
        // side, so the left call runs first and lines the recursion up
        // with the array.
        cursor++;
        walk(preorder, cursor, low, value);
        walk(preorder, cursor, value, high);
    }
};
