impl Solution {
    pub fn remove_nodes(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Collect values; scanning from the end, keep those >= the max of
        // their suffix. `kept` ends up reversed, so prepending its elements
        // in order restores the original order.
        let mut vals = Vec::new();
        let mut cur = head;
        while let Some(node) = cur {
            vals.push(node.val);
            cur = node.next;
        }
        let mut kept: Vec<i32> = Vec::new();
        let mut max_seen = i32::MIN;
        for &v in vals.iter().rev() {
            if v >= max_seen {
                kept.push(v);
                max_seen = v;
            }
        }
        let mut result: Option<Box<ListNode>> = None;
        for &v in kept.iter() {
            result = Some(Box::new(ListNode { val: v, next: result }));
        }
        result
    }
}
