impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        // A dummy node in front of the head makes removing the true head the
        // same unlink as any other node.
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        // fast runs n nodes ahead of slow, then walks to the end; the steps
        // it travels after the gap is set are exactly how far slow must walk
        // from the dummy. Rust forbids two live cursors in one Box chain, so
        // the two walks run one after the other instead of interleaved:
        // same nodes, same single sweep.
        let mut steps = 0;
        {
            let mut fast = dummy.next.as_ref();
            for _ in 0..n {
                fast = fast.unwrap().next.as_ref();
            }
            while fast.is_some() {
                steps += 1;
                fast = fast.unwrap().next.as_ref();
            }
        }
        // slow stops on the predecessor of the node being removed; the take
        // hands that node's next back as the rest of the list.
        let mut slow = &mut dummy;
        for _ in 0..steps {
            slow = slow.next.as_mut().unwrap();
        }
        slow.next = slow.next.take().unwrap().next;
        dummy.next
    }
}
