use std::collections::HashMap;

impl Solution {
    pub fn finish_time(n: i32, edges: Vec<Vec<i32>>, base_time: Vec<i32>) -> i64 {
        // Rerooting DP: down[] finishes each side with the parent direction
        // excluded, up[] mirrors the value flowing back from the parent side.
        // Answers reach n * max(base_time) = 10^10, so all values stay i64.
        let n = n as usize;
        let mut adjacency = vec![Vec::<usize>::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adjacency[u].push(v);
            adjacency[v].push(u);
        }
        let mut parent = vec![-1i64; n];
        parent[0] = -2;
        let mut order = Vec::with_capacity(n);
        order.push(0usize);
        let mut head = 0;
        while head < order.len() {
            let node = order[head];
            head += 1;
            for &next in &adjacency[node] {
                if parent[next] == -1 {
                    parent[next] = node as i64;
                    order.push(next);
                }
            }
        }
        let base: Vec<i64> = base_time.iter().map(|&t| t as i64).collect();
        let mut down = vec![0i64; n];
        for &v in order.iter().rev() {
            // smallest / largest finish among the children
            let (mut low, mut high) = (i64::MAX, i64::MIN);
            let mut found = false;
            for &w in &adjacency[v] {
                if w as i64 != parent[v] {
                    found = true;
                    low = low.min(down[w]);
                    high = high.max(down[w]);
                }
            }
            // A leaf role stops at the task's own duration.
            down[v] = if !found { base[v] } else { high + (high - low) + base[v] };
        }
        let mut up = vec![0i64; n];
        let mut best = i64::MAX;
        for &v in &order {
            let mut incoming: Vec<i64> = Vec::with_capacity(adjacency[v].len() + 1);
            let mut slots: HashMap<usize, usize> = HashMap::new(); // child -> its slot
            for &w in &adjacency[v] {
                if w as i64 != parent[v] {
                    slots.insert(w, incoming.len());
                    incoming.push(down[w]);
                }
            }
            if v != 0 {
                incoming.push(up[v]);
            }
            if incoming.is_empty() {
                return base[v]; // n == 1: lone task as root
            }
            // Two smallest / two largest entries, positions kept apart so one
            // branch can be excluded without losing a duplicated extreme.
            let inf = i64::MAX;
            let mut low1 = inf;
            let mut low2 = inf;
            let mut high1 = -inf;
            let mut high2 = -inf;
            let mut low_slot = usize::MAX;
            let mut high_slot = usize::MAX;
            for (i, &value) in incoming.iter().enumerate() {
                if value < low1 {
                    low2 = low1;
                    low1 = value;
                    low_slot = i;
                } else if value < low2 {
                    low2 = value;
                }
                if value > high1 {
                    high2 = high1;
                    high1 = value;
                    high_slot = i;
                } else if value > high2 {
                    high2 = value;
                }
            }
            best = best.min(high1 + (high1 - low1) + base[v]);
            for (&child, &slot) in &slots {
                let rest_low = if slot == low_slot { low2 } else { low1 };
                let rest_high = if slot == high_slot { high2 } else { high1 };
                up[child] = if incoming.len() == 1 {
                    // Without this branch the neighbour plays a leaf role.
                    base[v]
                } else {
                    rest_high + (rest_high - rest_low) + base[v]
                };
            }
        }
        best
    }
}
