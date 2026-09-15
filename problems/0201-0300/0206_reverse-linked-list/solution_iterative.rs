impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // prev heads the already-reversed chain; invariant: behind prev
        // everything is reversed, ahead of current nothing has been touched.
        let mut prev: Option<Box<ListNode>> = None;
        let mut current = head;
        while let Some(mut node) = current {
            // take() moves the rest of the list out before the flip.
            current = node.next.take();
            node.next = prev;
            prev = Some(node);
        }
        // current is exhausted: prev points at the original tail, the new head.
        prev
    }
}
