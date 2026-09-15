// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn swap_pairs(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Dummy head anchors the rewired list so the first pair is not a
        // special case; prev always points at the node before the next pair.
        let mut dummy = ListNode { val: 0, next: head };
        let mut prev = &mut dummy;
        // A pair needs two nodes; a lone leftover tail stays where it is.
        while prev.next.is_some() && prev.next.as_ref().unwrap().next.is_some() {
            // Ownership forces the pair to be fully unhooked before it is
            // crossed: take both nodes out, then re-link them swapped.
            let mut first = prev.next.take().unwrap();
            let mut second = first.next.take().unwrap();
            first.next = second.next.take();
            second.next = Some(first);
            prev.next = Some(second);
            // The new second (old first) is now the tail of the swapped
            // pair, so it is the "node before the next pair".
            prev = prev.next.as_mut().unwrap().next.as_mut().unwrap();
        }
        dummy.next
    }
}
