impl Solution {
    pub fn nodes_between_critical_points(head: Option<Box<ListNode>>) -> Vec<i32> {
        let mut previous = head.as_deref().unwrap();
        let mut current = previous.next.as_deref().unwrap();
        let mut index = 1;
        let mut first = -1;
        let mut last = -1;
        let mut minimum_gap = i32::MAX;

        while let Some(following) = current.next.as_deref() {
            if (current.val > previous.val && current.val > following.val)
                || (current.val < previous.val && current.val < following.val)
            {
                if first == -1 {
                    first = index;
                } else {
                    minimum_gap = minimum_gap.min(index - last);
                }
                last = index;
            }
            previous = current;
            current = following;
            index += 1;
        }

        if first == last {
            vec![-1, -1]
        } else {
            vec![minimum_gap, last - first]
        }
    }
}
