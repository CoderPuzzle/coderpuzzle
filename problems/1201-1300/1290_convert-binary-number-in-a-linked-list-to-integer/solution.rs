impl Solution {
    pub fn get_decimal_value(head: Option<Box<ListNode>>) -> i32 {
        // Horner's rule along the list: each new bit shifts everything
        // seen so far left by one and appends itself.
        let mut value = 0i32;
        let mut node = head;
        while let Some(current) = node {
            value = value << 1 | current.val;
            node = current.next;
        }
        value
    }
}
