impl Solution {
    pub fn merge_two_lists(list1: Option<Box<ListNode>>, list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match (list1, list2) {
            // Base case: an empty list is already sorted, so the other list —
            // whatever remains of it — is the merged continuation as is.
            (None, b) => b,
            (a, None) => a,
            (Some(mut a_node), Some(mut b_node)) => {
                // The smaller head stands in front; the recursion merges what
                // follows it with the untouched other list. <= keeps the first
                // list ahead on ties, matching the iterative merge's
                // stability. Ownership forces the detour: detach the winner's
                // tail so the recursive call owns it, then reattach the merged
                // remainder.
                if a_node.val <= b_node.val {
                    let rest = a_node.next.take();
                    a_node.next = Solution::merge_two_lists(rest, Some(b_node));
                    Some(a_node)
                } else {
                    let rest = b_node.next.take();
                    b_node.next = Solution::merge_two_lists(Some(a_node), rest);
                    Some(b_node)
                }
            }
        }
    }
}
