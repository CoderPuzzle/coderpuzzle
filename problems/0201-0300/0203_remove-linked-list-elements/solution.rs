impl Solution {
    pub fn remove_elements(head: Option<Box<ListNode>>, val: i32) -> Option<Box<ListNode>> {
        // A dummy head stands in front of the real list, so deleting the
        // original head is an ordinary unlink of somebody's successor.
        // Ownership forbids holding a node and its successor live at once,
        // so the walk peeks by shared reference and splices matches out.
        let mut dummy = ListNode::new(0);
        dummy.next = head;
        let mut current = &mut dummy;
        while current.next.is_some() {
            if current.next.as_ref().unwrap().val == val {
                // Skip the matching node. The cursor stays put — the node
                // behind it may match too, and that node is now current.next.
                current.next = current.next.take().unwrap().next;
            } else {
                // A keeper: step onto it and look at what follows.
                current = current.next.as_mut().unwrap();
            }
        }
        dummy.next
    }
}
