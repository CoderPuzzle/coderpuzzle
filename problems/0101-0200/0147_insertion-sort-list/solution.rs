// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn insertion_sort_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Sentinel node: every insertion, even the one before the first
        // node, links into a predecessor that already exists; the sorted
        // chain hangs off it and sentinel.next is returned at the end.
        let mut sentinel = Box::new(ListNode::new(0));
        // A Box chain cannot be read by two cursors at once, so the sorted
        // prefix cannot be extended in place: `rest` is consumed node by
        // node and each detached node is spliced into the sorted chain —
        // still one detach and one splice per node, the same insertion sort.
        let mut rest = head;
        while let Some(mut node) = rest {
            rest = node.next.take();
            // Walk the sorted chain to the predecessor of the first value
            // greater than the node's — the insertion point by definition.
            let mut cursor = &mut sentinel;
            while let Some(next) = cursor.next.as_ref() {
                if next.val > node.val {
                    break;
                }
                cursor = cursor.next.as_mut().unwrap();
            }
            node.next = cursor.next.take();
            cursor.next = Some(node);
        }
        sentinel.next
    }
}
