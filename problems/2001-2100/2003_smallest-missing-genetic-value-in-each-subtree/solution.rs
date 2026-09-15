impl Solution {
    pub fn smallest_missing_value_subtree(parents: Vec<i32>, nums: Vec<i32>) -> Vec<i32> {
        let n = parents.len();
        let mut children = vec![Vec::new(); n];
        let mut one_node: i32 = -1;
        for node in 0..n {
            if parents[node] != -1 {
                children[parents[node] as usize].push(node);
            }
            if nums[node] == 1 {
                one_node = node as i32;
            }
        }

        let mut answers = vec![1; n];
        if one_node == -1 {
            return answers;
        }

        let mut visited = vec![false; n];
        let mut present = vec![false; n + 2];
        let mut missing = 1usize;
        let mut ancestor = one_node;
        while ancestor != -1 {
            let mut stack = vec![ancestor as usize];
            while let Some(node) = stack.pop() {
                if visited[node] {
                    continue;
                }
                visited[node] = true;
                let value = nums[node] as usize;
                if value < present.len() {
                    present[value] = true;
                }
                stack.extend(children[node].iter().copied());
            }
            while present[missing] {
                missing += 1;
            }
            answers[ancestor as usize] = missing as i32;
            ancestor = parents[ancestor as usize];
        }
        answers
    }
}
