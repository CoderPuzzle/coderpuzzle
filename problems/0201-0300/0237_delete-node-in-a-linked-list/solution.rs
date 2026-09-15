impl Solution {
    pub fn delete_node(head: Option<Box<ListNode>>, node: i32) -> Option<Box<ListNode>> {
        // The wire names the node by its value; values are unique, so one walk
        // from the head finds exactly the node to delete. Ownership forbids
        // holding a node and its successor at once, so the copy-in reads the
        // successor by shared reference before the bypass takes it.
        let mut head = head;
        let mut current = head.as_mut().unwrap();
        while current.val != node {
            current = current.next.as_mut().unwrap();
        }
        current.val = current.next.as_ref().unwrap().val;
        current.next = current.next.take().unwrap().next;
        head
    }
}
