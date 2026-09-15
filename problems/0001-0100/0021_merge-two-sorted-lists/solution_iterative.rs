impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut a = list1;
        let mut b = list2;
        // Dummy head: the loop attaches every node the same way, with no
        // special case for the first one; the real head falls out as
        // dummy.next at the end.
        let mut dummy = Box::new(ListNode { val: 0, next: None });
        let mut cur: &mut ListNode = &mut dummy;
        loop {
            // Pick which list feeds the next node: the smaller current head
            // while both remain (ties take list a, keeping the merge
            // stable); once one list runs out, keep draining the survivor.
            let take_a = match (&a, &b) {
                (Some(x), Some(y)) => x.val <= y.val,
                (Some(_), None) => true,
                (None, _) => false,
            };
            let taken = if take_a { a.take() } else { b.take() };
            match taken {
                Some(mut node) => {
                    // Detach the node's own tail before linking it, so the
                    // rest of its list stays with the owner.
                    let rest = node.next.take();
                    cur.next = Some(node);
                    cur = cur.next.as_mut().unwrap();
                    if take_a {
                        a = rest;
                    } else {
                        b = rest;
                    }
                }
                // Both lists exhausted: the merged list is complete.
                None => break,
            }
        }
        dummy.next
    }
}
