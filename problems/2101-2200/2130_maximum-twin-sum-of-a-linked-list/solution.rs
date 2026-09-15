impl Solution {
    pub fn pair_sum(mut head: Option<Box<ListNode>>) -> i32 {
        let mut length = 0;
        let mut current = head.as_deref();
        while let Some(node) = current {
            length += 1;
            current = node.next.as_deref();
        }

        let mut split = &mut head;
        for _ in 0..length / 2 {
            split = &mut split.as_mut().unwrap().next;
        }
        let mut second = split.take();
        let mut reversed_half = None;
        while let Some(mut node) = second {
            second = node.next.take();
            node.next = reversed_half;
            reversed_half = Some(node);
        }

        let mut answer = 0;
        let mut first = head.as_deref();
        let mut second = reversed_half.as_deref();
        while let (Some(left), Some(right)) = (first, second) {
            answer = answer.max(left.val + right.val);
            first = left.next.as_deref();
            second = right.next.as_deref();
        }
        answer
    }
}
