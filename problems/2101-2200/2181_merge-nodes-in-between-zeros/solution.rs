impl Solution {
    pub fn merge_nodes(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // One pass: skip the leading 0 sentinel, accumulate values until
        // the next 0, then that sum becomes a result node. The dummy head
        // keeps the first segment ordinary.
        let mut dummy = Box::new(ListNode { val: 0, next: None });
        let mut tail = &mut dummy;
        let mut node = head.unwrap().next;
        let mut total = 0i64;
        while let Some(current) = node {
            if current.val == 0 {
                tail.next = Some(Box::new(ListNode {
                    val: total as i32,
                    next: None,
                }));
                tail = tail.next.as_mut().unwrap();
                total = 0;
            } else {
                total += current.val as i64;
            }
            node = current.next;
        }
        dummy.next
    }
}
