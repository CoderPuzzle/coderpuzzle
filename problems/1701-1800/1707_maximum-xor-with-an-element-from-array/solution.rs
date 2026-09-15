impl Solution {
    pub fn maximize_xor(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut sorted_nums = nums.clone();
        sorted_nums.sort_unstable();
        let nq = queries.len();
        let mut order: Vec<usize> = (0..nq).collect();
        order.sort_by(|&a, &b| {
            let (qa, qb) = (&queries[a], &queries[b]);
            qa[1].cmp(&qb[1]).then(qa[0].cmp(&qb[0])).then(a.cmp(&b))
        });
        let mut answers = vec![0i32; nq];
        // trie: flat arena of [child0, child1]
        let mut child: Vec<[i32; 2]> = Vec::with_capacity(sorted_nums.len() * 31 + 4);
        child.push([-1, -1]);
        let mut ptr = 0usize;
        let n = sorted_nums.len();
        // Offline: with nums and queries both sorted by threshold, the trie
        // holds exactly the values <= mi when a query runs, so the filter
        // costs nothing at query time.
        for &idx in &order {
            let mi = queries[idx][1];
            let xi = queries[idx][0];
            // ptr only moves forward — each number enters the trie once.
            // 30 levels (bit 29 down to 0) cover every value < 2^30.
            while ptr < n && sorted_nums[ptr] <= mi {
                let mut node = 0usize;
                let v = sorted_nums[ptr];
                for bit in (0..=29).rev() {
                    let b = ((v >> bit) & 1) as usize;
                    if child[node][b] == -1 {
                        child[node][b] = child.len() as i32;
                        child.push([-1, -1]);
                    }
                    node = child[node][b] as usize;
                }
                ptr += 1;
            }
            if ptr == 0 {
                // Threshold admits no element yet — no candidate exists.
                answers[idx] = -1;
                continue;
            }
            let mut node = 0usize;
            let mut best = 0i32;
            // Greedy descent from the MSB: prefer the complement child so
            // this result bit becomes 1; settle for the matching child.
            for bit in (0..=29).rev() {
                let xb = ((xi >> bit) & 1) as usize;
                let want = 1 - xb;
                if child[node][want] != -1 {
                    best |= 1 << bit;
                    node = child[node][want] as usize;
                } else {
                    node = child[node][xb] as usize;
                }
            }
            answers[idx] = best;
        }
        answers
    }
}
