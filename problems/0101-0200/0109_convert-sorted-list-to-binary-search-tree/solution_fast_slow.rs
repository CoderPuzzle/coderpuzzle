impl Solution {
    pub fn sorted_list_to_bst(head: Option<Box<ListNode>>) -> Option<Box<TreeNode>> {
        // A singly linked list gives no random access, and safe Rust cannot
        // walk one with the two aliasing pointers the midpoint hunt needs —
        // so flatten it (keeping its sorted order) once, then run the same
        // two-pointer walk over indices.
        let mut values: Vec<i32> = Vec::new();
        let mut current = head;
        while let Some(node) = current {
            values.push(node.val);
            current = node.next;
        }
        build(&values, 0, values.len())
    }
}

fn build(values: &[i32], lo: usize, hi: usize) -> Option<Box<TreeNode>> {
    // Empty segment <=> missing child.
    if lo >= hi {
        return None;
    }
    // Slow/fast midpoint over the segment: slow steps one index, fast two,
    // so when fast runs past hi slow has stopped on the midpoint. The guard
    // leaves slow on the SECOND of two middles for even lengths, matching
    // the required tie-break.
    let mut slow = lo;
    let mut fast = lo;
    while fast + 1 < hi {
        slow += 1;
        fast += 2;
    }
    // The middle element is the only root choice making both sides BSTs and
    // keeping them near-equal in size, so the tree comes out
    // height-balanced; the recursion treats the two sides as independent
    // segments.
    Some(Box::new(TreeNode {
        val: values[slow],
        left: build(values, lo, slow),
        right: build(values, slow + 1, hi),
    }))
}
