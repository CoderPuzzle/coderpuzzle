impl Solution {
    pub fn sorted_list_to_bst(head: Option<Box<ListNode>>) -> Option<Box<TreeNode>> {
        // One sizing pass first: the recursion needs each subtree's node
        // count to pick the same middles the midpoint walk would.
        let mut count = 0usize;
        let mut current = head.as_deref();
        while let Some(node) = current {
            count += 1;
            current = node.next.as_deref();
        }
        // The cursor is the remaining list itself, threaded through the
        // recursion by &mut; each claim pops the head in original order,
        // exactly where an inorder insertion would place the node.
        let mut list = head;
        build(&mut list, count)
    }
}

fn build(list: &mut Option<Box<ListNode>>, count: usize) -> Option<Box<TreeNode>> {
    // Empty segment <=> missing child.
    if count == 0 {
        return None;
    }
    // The left subtree is the first count / 2 nodes — the same tie-break
    // as the midpoint walk, so both variants build the identical tree.
    let mid = count / 2;
    let left = build(list, mid);
    // Inorder position: after the left subtree, the next node in original
    // order is the root. take() pops it and re-seats the cursor on the
    // rest of the list.
    let mut node = list.take().expect("count > 0 guarantees a node");
    *list = node.next.take();
    let right = build(list, count - mid - 1);
    Some(Box::new(TreeNode {
        val: node.val,
        left,
        right,
    }))
}
