// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn reverse_between(head: Option<Box<ListNode>>, left: i32, right: i32) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        // `before` names the node just before the segment; the dummy fills
        // that role when the segment starts at the head.
        let mut before = &mut *dummy;
        for _ in 0..left - 1 {
            before = before.next.as_deref_mut().unwrap();
        }
        // Detach the remainder, then flip exactly right - left + 1 links onto
        // `prev`, the reversed segment so far; `curr` keeps the unconsumed
        // nodes of the segment.
        let length = right - left + 1;
        let mut curr = before.next.take();
        let mut prev: Option<Box<ListNode>> = None;
        for _ in 0..length {
            let mut node = curr.take().unwrap();
            curr = node.next.take();
            node.next = prev;
            prev = Some(node);
        }
        // `prev` heads the reversed segment and `curr` is the remainder.
        // Attach the segment, then walk to its far end — the old first
        // node, now its last — and hand it the remainder.
        before.next = prev;
        for _ in 0..length {
            before = before.next.as_deref_mut().unwrap();
        }
        before.next = curr;
        dummy.next
    }
}
