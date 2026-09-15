impl Solution {
    pub fn max_depth_after_split(seq: String) -> Vec<i32> {
        let mut answer = Vec::with_capacity(seq.len());
        let mut stack: Vec<i32> = Vec::new(); // group id of each still-open '('
        let mut depth = [0i32, 0i32];
        let mut last = 0i32;
        for char in seq.chars() {
            if char == '(' {
                // Open in the shallower group; on a tie reuse the group the
                // previous '(' joined, so the depth gap never exceeds one.
                let group = if depth[0] < depth[1] {
                    0
                } else if depth[1] < depth[0] {
                    1
                } else {
                    last
                };
                answer.push(group);
                stack.push(group);
                depth[group as usize] += 1;
                last = group;
            } else {
                // A ')' must close the matching '(' in the same group.
                let group = stack.pop().unwrap();
                depth[group as usize] -= 1;
                answer.push(group);
            }
        }
        answer
    }
}
