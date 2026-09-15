impl Solution {
    pub fn count_highest_score_nodes(parents: Vec<i32>) -> i32 {
        let n = parents.len();
        let mut children = vec![Vec::new(); n];
        for node in 1..n {
            children[parents[node] as usize].push(node);
        }

        let mut order = Vec::with_capacity(n);
        let mut stack = vec![0_usize];
        while let Some(node) = stack.pop() {
            order.push(node);
            stack.extend_from_slice(&children[node]);
        }

        let mut subtree = vec![1_i32; n];
        let mut highest = 0_i64;
        let mut count = 0_i32;
        for &node in order.iter().rev() {
            let mut size = 1_i32;
            let mut score = 1_i64;
            for &child in &children[node] {
                size += subtree[child];
                score *= subtree[child] as i64;
            }
            subtree[node] = size;
            let outside = n as i32 - size;
            if outside != 0 {
                score *= outside as i64;
            }
            if score > highest {
                highest = score;
                count = 1;
            } else if score == highest {
                count += 1;
            }
        }
        count
    }
}
