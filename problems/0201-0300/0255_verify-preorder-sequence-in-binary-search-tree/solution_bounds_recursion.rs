impl Solution {
    pub fn verify_preorder(preorder: Vec<i32>) -> bool {
        // Each recursive call charges one node with the open interval (low,
        // high) its ancestors stake out — the search-tree property confines
        // every node to that interval. A claimed value tightens the
        // interval for the left call to (low, value) and for the right call
        // to (value, high), and the cursor is the slice each call hands
        // down, so a value one interval rejects waits in place for the
        // ancestor that still admits it.
        // The bounds are 64-bit: values reach the i32 extremes, and a
        // 32-bit sentinel would collide with a real boundary value.
        // An empty remainder is every value placed in the one slot the
        // ordering rules leave open.
        Self::walk(&preorder, i64::MIN, i64::MAX).is_empty()
    }

    // Consumes the subtree the open interval (low, high) admits and
    // returns whatever prefix of the input it left unclaimed.
    fn walk(preorder: &[i32], low: i64, high: i64) -> &[i32] {
        match preorder.split_first() {
            // Inside the interval: claim the value, then let the left call
            // run first — preorder emits a node, its whole left side, then
            // its right side — and hand back whatever stays unclaimed.
            Some((&value, rest)) if (value as i64) > low && (value as i64) < high => {
                let v = value as i64;
                let rest = Self::walk(rest, low, v);
                Self::walk(rest, v, high)
            }
            // The array ran dry or the next value escapes the interval:
            // this subtree is done, and the rest waits under the cursor
            // for an ancestor whose interval admits it.
            _ => preorder,
        }
    }
}
