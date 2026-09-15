impl Solution {
    pub fn is_palindrome(head: Option<Box<ListNode>>) -> bool {
        // Count the nodes with a shared walk: ownership wants the split
        // point settled before anything is unlinked.
        let mut n = 0;
        let mut cursor = head.as_ref();
        while let Some(node) = cursor {
            n += 1;
            cursor = node.next.as_ref();
        }
        // Walk an exclusive cursor down the first half, then detach the
        // back half (middle included when n is odd) in one take().
        let mut first = head;
        let mut tail = &mut first;
        for _ in 0..n / 2 {
            tail = &mut tail.as_mut().unwrap().next;
        }
        let mut second = tail.take();
        // Classic unlink-and-prepend reversal of the back half.
        let mut reversed = None;
        while let Some(mut node) = second {
            second = node.next.take();
            node.next = reversed;
            reversed = Some(node);
        }
        // Compare the halves in lockstep; an odd length leaves the middle
        // node unmatched at the tail of `reversed`, where it faces itself.
        let mut left = first;
        let mut right = reversed;
        loop {
            match (left, right) {
                (Some(l), Some(r)) => {
                    if l.val != r.val {
                        return false;
                    }
                    (left, right) = (l.next, r.next);
                }
                _ => return true,
            }
        }
    }
}
