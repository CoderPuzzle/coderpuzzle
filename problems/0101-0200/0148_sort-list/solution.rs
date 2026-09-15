impl Solution {
    // Merge by relinking: keep the smaller front node and recurse on the
    // remainder; <= takes from the first half on ties, keeping it stable.
    fn merge(a: Option<Box<ListNode>>, b: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match (a, b) {
            (None, other) => other,
            (some, None) => some,
            (Some(mut x), Some(mut y)) => {
                if x.val <= y.val {
                    let rest = x.next.take();
                    x.next = Self::merge(rest, Some(y));
                    Some(x)
                } else {
                    let rest = y.next.take();
                    y.next = Self::merge(Some(x), rest);
                    Some(y)
                }
            }
        }
    }

    pub fn sort_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Measure the length so the list can be split by ownership at n/2.
        let mut n = 0usize;
        let mut p = head.as_deref();
        while let Some(node) = p {
            n += 1;
            p = node.next.as_deref();
        }
        // Base case: an empty or single-node list is already sorted.
        if n <= 1 {
            return head;
        }
        let mut node = match head {
            Some(node) => node,
            None => return None,
        };
        // Cut after the first n/2 nodes: both halves are strictly shorter,
        // which makes the recursion terminate.
        let right = {
            let mut r: &mut ListNode = &mut node;
            for _ in 0..(n / 2 - 1) {
                r = r.next.as_mut().unwrap();
            }
            r.next.take()
        };
        let left = Self::sort_list(Some(node));
        let right = Self::sort_list(right);
        Self::merge(left, right)
    }
}
