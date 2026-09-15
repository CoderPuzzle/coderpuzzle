// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn sort_linked_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut rest = head;
        let mut negative = None;
        let mut nonnegative = None;
        let mut nonnegative_tail = &mut nonnegative;

        while let Some(mut node) = rest {
            rest = node.next.take();
            if node.val < 0 {
                node.next = negative;
                negative = Some(node);
            } else {
                *nonnegative_tail = Some(node);
                nonnegative_tail = &mut nonnegative_tail.as_mut().unwrap().next;
            }
        }

        if let Some(first_negative) = negative.as_mut() {
            let mut tail = first_negative;
            while tail.next.is_some() {
                tail = tail.next.as_mut().unwrap();
            }
            tail.next = nonnegative;
            negative
        } else {
            nonnegative
        }
    }
}
