impl Solution {
    pub fn partition(head: Option<Box<ListNode>>, x: i32) -> Option<Box<ListNode>> {
        // Two dummy heads anchor the chains of nodes below x and of all the
        // rest; each tail remembers where that chain's next node will attach.
        let mut before_head = ListNode::new(0);
        let mut after_head = ListNode::new(0);
        // Each tail borrows into its own dummy only, so the two chains stay
        // independently appendable for the whole walk.
        let mut before_tail: &mut ListNode = &mut before_head;
        let mut after_tail: &mut ListNode = &mut after_head;
        let mut head = head;
        while let Some(mut node) = head.take() {
            // Take the successor first: every original next link is consumed
            // by the walk, which is what leaves the chains cleanly detached.
            head = node.next.take();
            // Append to whichever chain claims the value: the walk order is
            // the append order, so each partition keeps its original order.
            if node.val < x {
                before_tail.next = Some(node);
                before_tail = before_tail.next.as_mut().unwrap();
            } else {
                after_tail.next = Some(node);
                after_tail = after_tail.next.as_mut().unwrap();
            }
        }
        // Splice the high chain onto the low one. No cut is needed here:
        // the walk already took every node's next link, so the high chain's
        // tail cannot point back into the low chain.
        let after_chain = after_head.next.take();
        before_tail.next = after_chain;
        before_head.next
    }
}
