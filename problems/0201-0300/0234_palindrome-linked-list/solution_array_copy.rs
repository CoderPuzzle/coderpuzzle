impl Solution {
    pub fn is_palindrome(head: Option<Box<ListNode>>) -> bool {
        // Copy the values out with one forward walk over borrowed nodes;
        // the list itself is never taken apart.
        let mut values = Vec::new();
        let mut cursor = head.as_ref();
        while let Some(node) = cursor {
            values.push(node.val);
            cursor = node.next.as_ref();
        }
        // Two-ended compare: i walks forward, j backward, and every mirror
        // pair must agree before the indices meet in the middle.
        let mut i = 0;
        let mut j = values.len() - 1;
        while i < j {
            if values[i] != values[j] {
                return false;
            }
            i += 1;
            j -= 1;
        }
        true
    }
}
