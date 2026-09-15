function sortedListToBST(head: ListNode | null): TreeNode | null {
    // One sizing pass first: the recursion needs each subtree's node
    // count to pick the same middles the midpoint walk would.
    let count = 0;
    for (let node = head; node !== null; node = node.next) {
        count++;
    }
    // The cursor walks the list in original order; the recursion claims
    // nodes exactly where an inorder insertion would place them.
    let current: ListNode | null = head;
    function build(lo: number, hi: number): TreeNode | null {
        if (lo >= hi) {
            return null;
        }
        // The left subtree is the first half of [lo, hi) — the same
        // tie-break as the midpoint walk, so both variants build the
        // identical tree.
        const mid = Math.floor((lo + hi) / 2);
        const left = build(lo, mid);
        // Inorder position: after the left subtree, the next node in
        // original order is the root; the cursor hands it over and steps
        // forward, then the right subtree takes what remains.
        const root = new TreeNode(current!.val);
        current = current!.next;
        root.left = left;
        root.right = build(mid + 1, hi);
        return root;
    }
    return build(0, count);
}
