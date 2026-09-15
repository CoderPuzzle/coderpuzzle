impl Solution {
    pub fn middle_node(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // fast takes two links for slow's one, so slow ends on the second
        // middle. Rust forbids two live cursors in one Box chain, so the
        // fast walk measures how many front nodes slow must shed; the
        // suffix it leaves behind is the answer.
        let mut steps = 0;
        {
            let mut fast = head.as_ref();
            while let Some(node) = fast {
                match node.next.as_ref() {
                    Some(second) => fast = second.next.as_ref(),
                    None => break,
                }
                steps += 1;
            }
        }
        let mut slow = head;
        for _ in 0..steps {
            slow = slow.and_then(|node| node.next);
        }
        slow
    }
}
