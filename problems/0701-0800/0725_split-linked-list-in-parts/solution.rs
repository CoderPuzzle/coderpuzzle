// Bundle-provided types (assembled with this submission):
//   ListNode:  { field val: i32, next: Option<Box<ListNode>> }
//   TreeNode:  { field val: i32, left/right: Option<Box<TreeNode>> }

impl Solution {
    pub fn split_list_to_parts(head: Option<Box<ListNode>>, k: i32) -> Vec<Option<Box<ListNode>>> {
        // First pass, count only: how many nodes are to spread over k parts.
        let mut n = 0usize;
        let mut link = head.as_deref();
        while let Some(node) = link {
            n += 1;
            link = node.next.as_deref();
        }
        // Every part takes width = n / k nodes and the first extra = n % k
        // parts one more — the unique split whose sizes differ by at most
        // one with no earlier part smaller than a later one.
        let parts_count = k as usize;
        let (width, extra) = (n / parts_count, n % parts_count);
        let mut parts: Vec<Option<Box<ListNode>>> = Vec::with_capacity(parts_count);
        // The list is owned, so each cut is a move: a part's last node
        // hands its tail over with take() instead of a pointer write.
        let mut current = head;
        for index in 0..parts_count {
            // This part starts where the previous one was cut loose.
            let size = width + usize::from(index < extra);
            let mut part = current.take();
            // Hop to the part's last node. A zero-size part never enters
            // (it arises only after every node was handed out, so the part
            // is already None), and a positive-size part always finds its
            // size - 1 successors because the sizes sum to n.
            if size > 0 {
                let mut tail = part.as_mut().unwrap();
                for _ in 1..size {
                    tail = tail.next.as_mut().unwrap();
                }
                current = tail.next.take();
            }
            parts.push(part);
        }
        parts
    }
}
