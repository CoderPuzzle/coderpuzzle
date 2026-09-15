impl Solution {
    fn farthest_within(adj: &Vec<Vec<usize>>, start: usize, mask: u32) -> (usize, i32, u32) {
        let mut dist: Vec<i32> = vec![-1; adj.len()];
        dist[start] = 0;
        let mut queue = vec![start];
        let mut head = 0;
        let mut far_node = start;
        let mut far_dist = 0;
        let mut reached = 1u32;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            for &nxt in &adj[node] {
                if (mask >> (nxt - 1)) & 1 == 1 && dist[nxt] == -1 {
                    dist[nxt] = dist[node] + 1;
                    reached += 1;
                    if dist[nxt] > far_dist {
                        far_node = nxt;
                        far_dist = dist[nxt];
                    }
                    queue.push(nxt);
                }
            }
        }
        (far_node, far_dist, reached)
    }

    pub fn count_subtrees_for_each_diameter(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            adj[u].push(v);
            adj[v].push(u);
        }

        let mut ans = vec![0i32; n - 1];
        for mask in 1u32..(1u32 << n) {
            let size = mask.count_ones();
            if size < 2 {
                continue;
            }
            let start = mask.trailing_zeros() as usize + 1;
            let (far1, _, reached) = Self::farthest_within(&adj, start, mask);
            if reached != size {
                continue;
            }
            let (_, diameter, _) = Self::farthest_within(&adj, far1, mask);
            ans[(diameter - 1) as usize] += 1;
        }
        ans
    }
}
