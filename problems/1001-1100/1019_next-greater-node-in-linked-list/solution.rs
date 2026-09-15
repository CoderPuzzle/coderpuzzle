impl Solution {
    pub fn next_larger_nodes(head: Option<Box<ListNode>>) -> Vec<i32> {
        let mut values: Vec<i32> = Vec::new();
        let mut current = head.as_deref();
        while let Some(node) = current {
            values.push(node.val);
            current = node.next.as_deref();
        }
        let n = values.len();
        let mut answer = vec![0i32; n];
        let mut stack: Vec<usize> = Vec::new(); // indices with values in decreasing order
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if values[top] < values[i] {
                    answer[top] = values[i];
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(i);
        }
        answer
    }
}
