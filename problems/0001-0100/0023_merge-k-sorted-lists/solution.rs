impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        let mut cur = lists;
        // Tournament rounds: merge adjacent pairs, halving the field each
        // round. Every surviving node is walked once per round across
        // ceil(log2 k) rounds, unlike sequential folding which can re-walk
        // one long list k times.
        while cur.len() > 1 {
            let mut next = Vec::with_capacity((cur.len() + 1) / 2);
            let mut it = cur.into_iter();
            // Pull two at a time; on an odd count the second next() yields
            // None, so merge2 just hands that last list through (a bye).
            while let (Some(a), b) = (it.next(), it.next()) {
                next.push(merge2(a, b.flatten()));
            }
            cur = next;
        }
        // One survivor is the fully merged list; flatten maps an input of
        // [None] to None.
        cur.into_iter().next().flatten()
    }
}

// Standard two-pointer merge behind a dummy head: link the smaller current
// head, advance that list, splice the leftover when one runs dry.
fn merge2(mut a: Option<Box<ListNode>>, mut b: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut dummy = Box::new(ListNode { val: 0, next: None });
    let mut tail = &mut dummy;
    loop {
        // Once either side is exhausted the loop ends and the splice below
        // finishes the merge.
        let take_a = match (&a, &b) {
            (Some(x), Some(y)) => x.val <= y.val,
            _ => break,
        };
        if take_a {
            // Detach the node from its own tail before relinking, so the
            // rest of that list stays with the owner.
            let mut node = a.take().unwrap();
            a = node.next.take();
            tail.next = Some(node);
        } else {
            let mut node = b.take().unwrap();
            b = node.next.take();
            tail.next = Some(node);
        }
        tail = tail.next.as_mut().unwrap();
    }
    tail.next = a.or(b);
    dummy.next
}
