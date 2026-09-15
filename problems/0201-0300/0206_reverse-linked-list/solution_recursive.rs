impl Solution {
    pub fn reverse_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Recursive formulation with an accumulator: each call peels the
        // head, flips its next onto the reversed prefix built so far, and
        // hands the rest to the next call. Safe Rust cannot hold the two
        // live references the classic "point head.next back at head" step
        // needs, so the already-reversed chain travels as a parameter
        // instead of living behind the recursion.
        reverse(head, None)
    }
}

// acc is the reversed prefix so far; once the list is exhausted it is the
// answer.
fn reverse(head: Option<Box<ListNode>>, acc: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    match head {
        // The list is fully consumed: the accumulated chain is the answer.
        None => acc,
        Some(mut node) => {
            // take() moves the rest of the list out before the flip.
            let rest = node.next.take();
            node.next = acc;
            reverse(rest, Some(node))
        }
    }
}
