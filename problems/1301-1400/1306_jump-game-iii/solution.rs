use std::collections::VecDeque;

impl Solution {
    pub fn can_reach(arr: Vec<i32>, start: i32) -> bool {
        // BFS over indexes: from i, the only successors are i +/- arr[i]. Each
        // index is visited once, so cycles cannot loop forever and a chain of
        // 5*10^4 indexes never touches the recursion stack.
        let n = arr.len();
        let mut visited = vec![false; n];
        let mut queue = VecDeque::new();
        queue.push_back(start as usize);
        visited[start as usize] = true;
        while let Some(i) = queue.pop_front() {
            if arr[i] == 0 {
                return true;
            }
            let step = arr[i] as i32;
            for nxt in [(i as i32) + step, (i as i32) - step] {
                if nxt >= 0 && (nxt as usize) < n && !visited[nxt as usize] {
                    visited[nxt as usize] = true;
                    queue.push_back(nxt as usize);
                }
            }
        }
        false
    }
}
