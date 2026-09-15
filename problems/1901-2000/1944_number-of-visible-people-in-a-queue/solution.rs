impl Solution {
    pub fn can_see_persons_count(heights: Vec<i32>) -> Vec<i32> {
        let n = heights.len();
        let mut answer = vec![0i32; n];
        // Scan right-to-left; the stack holds exactly the people visible to
        // a shorter person arriving from the left (heights increasing top-down).
        let mut stack: Vec<i32> = Vec::new();
        for i in (0..n).rev() {
            let mut seen = 0;
            // Each popped person is shorter and has only shorter people
            // between themselves and i, so i sees them. Strict < suffices
            // because all heights are distinct.
            while let Some(&top) = stack.last() {
                if top < heights[i] {
                    stack.pop();
                    seen += 1;
                } else {
                    break;
                }
            }
            // If anything remains, its top is the first person right of i
            // taller than i: visible across the popped people, and it blocks
            // everyone beyond it. Popped entries stay discarded -- i shadows
            // them for anyone further left.
            if !stack.is_empty() {
                seen += 1;
            }
            answer[i] = seen;
            stack.push(heights[i]);
        }
        // Each index is pushed and popped at most once: linear in total.
        answer
    }
}
