impl Solution {
    pub fn delete_duplicates(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // The list is sorted, so all copies of a value form one run; a kept
        // node only ever needs to look at its immediate successor. Ownership
        // forbids holding a node and its successor live at once, so the walk
        // peeks by shared reference and splices duplicates out with take().
        let mut head = head;
        let mut node = match head.as_mut() {
            Some(node) => node,
            // An empty list has no duplicates to unlink — return it as is.
            None => return head,
        };
        while node.next.is_some() {
            if node.next.as_ref().unwrap().val == node.val {
                // The successor is a copy of a node already kept — splice it
                // out. The cursor stays put in case the run continues.
                node.next = node.next.take().unwrap().next;
            } else {
                // A different value begins a new run; only now step forward.
                node = node.next.as_mut().unwrap();
            }
        }
        head
    }
}
