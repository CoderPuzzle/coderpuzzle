impl Solution {
    pub fn delete_nodes(head: Option<Box<ListNode>>, m: i32, n: i32) -> Option<Box<ListNode>> {
        // Sweep 1: record the values that survive each keep-m, drop-n cycle.
        // The walk peeks by shared reference and never rewrites a link, so
        // the input list is only read.
        let mut kept: Vec<i32> = Vec::new();
        let mut node = head.as_deref();
        while node.is_some() {
            for _ in 0..m {
                match node {
                    Some(run) => {
                        kept.push(run.val);
                        node = run.next.as_deref();
                    }
                    None => break,
                }
            }
            for _ in 0..n {
                match node {
                    Some(run) => node = run.next.as_deref(),
                    None => break,
                }
            }
        }
        // Sweep 2: rebuild a fresh list threaded from the surviving values.
        let mut dummy = Box::new(ListNode { val: 0, next: None });
        let mut tail = dummy.as_mut();
        for value in kept {
            tail.next = Some(Box::new(ListNode { val: value, next: None }));
            tail = tail.next.as_mut().unwrap();
        }
        dummy.next
    }
}
