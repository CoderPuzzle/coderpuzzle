impl Solution {
    pub fn path_existence_queries(n: i32, nums: Vec<i32>, max_diff: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        // In value-sorted order each node reaches a contiguous range of
        // positions, so the farthest position reachable in k hops composes
        // monotonically and binary lifting on the one-hop reach returns hop
        // counts in O(log n) per query.
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| nums[i]);
        let mut rank = vec![0usize; n];
        for (pos, &node) in order.iter().enumerate() {
            rank[node] = pos;
        }
        let mut comp = vec![0i32; n];
        for pos in 1..n {
            comp[pos] = comp[pos - 1]
                + if nums[order[pos]] - nums[order[pos - 1]] > max_diff {
                    1
                } else {
                    0
                };
        }
        let mut reach = vec![0usize; n];
        let mut j = 0usize;
        for i in 0..n {
            if j < i {
                j = i;
            }
            while j + 1 < n && nums[order[j + 1]] - nums[order[i]] <= max_diff {
                j += 1;
            }
            reach[i] = j;
        }

        // up[k][i] = farthest position reachable from i in at most 2^k hops.
        let mut logn = 1usize;
        while (1usize << logn) < n {
            logn += 1;
        }
        logn += 1;
        let mut up: Vec<Vec<usize>> = Vec::with_capacity(logn);
        up.push(reach);
        for k in 1..logn {
            let level: Vec<usize> = {
                let prev = &up[k - 1];
                (0..n).map(|i| prev[prev[i]]).collect()
            };
            up.push(level);
        }

        let mut answer = Vec::with_capacity(queries.len());
        for q in &queries {
            let a = rank[q[0] as usize];
            let b = rank[q[1] as usize];
            if comp[a] != comp[b] {
                answer.push(-1);
            } else if a == b {
                answer.push(0);
            } else {
                let (mut su, sv) = if a < b { (a, b) } else { (b, a) };
                let mut hops = 0i64;
                for k in (0..logn).rev() {
                    if up[k][su] < sv {
                        su = up[k][su];
                        hops += 1i64 << k;
                    }
                }
                answer.push((hops + 1) as i32);
            }
        }
        answer
    }
}
