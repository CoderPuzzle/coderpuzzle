use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn min_jumps(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        // Start is already the target.
        if n == 1 {
            return 0;
        }
        // One pass groups indices by value so a node's same-value neighbors
        // cost their group size instead of rescanning the array.
        let mut indices: HashMap<i32, Vec<usize>> = HashMap::new();
        for (i, &value) in arr.iter().enumerate() {
            indices.entry(value).or_default().push(i);
        }
        // BFS over the implicit graph (edges i-1, i+1, same-value) gives the
        // minimum step count; -1 doubles as the visited marker.
        let mut dist = vec![-1i32; n];
        dist[0] = 0;
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        while let Some(i) = queue.pop_front() {
            let d = dist[i] + 1;
            // Take (and drop) the group in one step: every index in it just
            // became visited at the same distance, so it can never again
            // produce an unvisited neighbor — without this, all-equal
            // arrays go quadratic.
            let same = indices.remove(&arr[i]).unwrap_or_default();
            let mut nexts: Vec<usize> = Vec::with_capacity(same.len() + 2);
            if i > 0 {
                nexts.push(i - 1);
            }
            nexts.push(i + 1);
            nexts.extend(same);
            for j in nexts {
                if j < n && dist[j] == -1 {
                    dist[j] = d;
                    // The search ends the moment the last index is labeled.
                    if j == n - 1 {
                        return d;
                    }
                    queue.push_back(j);
                }
            }
        }
        dist[n - 1]
    }
}
