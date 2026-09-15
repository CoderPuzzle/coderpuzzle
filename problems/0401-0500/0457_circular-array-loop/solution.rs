impl Solution {
    pub fn circular_array_loop(nums: Vec<i32>) -> bool {
        let n = nums.len() as i32;
        // Every index has exactly one successor, so each walk either closes
        // a loop or dies; 0 unseen, 1 on the current walk, 2 proven dead.
        let mut state = vec![0i32; n as usize];
        for start in 0..n {
            if state[start as usize] != 0 {
                continue;
            }
            let mut path: Vec<usize> = Vec::new();
            let mut node = start;
            while state[node as usize] == 0 {
                state[node as usize] = 1;
                path.push(node as usize);
                let next = ((node + nums[node as usize]) % n + n) % n;
                // A legal loop keeps one direction and more than one node,
                // so a sign flip or a hop back to self kills this chain.
                if nums[next as usize] * nums[node as usize] < 0 || next == node {
                    break;
                }
                node = next;
                if state[node as usize] == 1 {
                    return true;
                }
            }
            for walked in path {
                state[walked] = 2;
            }
        }
        false
    }
}
