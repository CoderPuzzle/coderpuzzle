impl Solution {
    pub fn double_it(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // A position carries into the one above it exactly when its original
        // digit is five or more: doubling produces that carry by itself, and
        // an incoming carry of one never flips the outcome (2 * 4 + 1 = 9
        // stays). So one forward pass rewrites each node from its successor
        // while the successor still holds its original digit, and the
        // original head digit, read before any write, tells whether a new
        // leading node must be prepended.
        let grows = match head.as_ref() {
            Some(node) => node.val >= 5,
            None => false,
        };
        let mut cur = head.as_mut();
        while let Some(node) = cur {
            let inc = match node.next.as_ref() {
                Some(next) if next.val >= 5 => 1,
                _ => 0,
            };
            node.val = (node.val * 2 + inc) % 10;
            cur = node.next.as_mut();
        }
        if grows {
            let mut front = Box::new(ListNode::new(1));
            front.next = head.take();
            Some(front)
        } else {
            head
        }
    }
}
