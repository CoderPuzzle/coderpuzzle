impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums.len();
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        let mut run = vec![0i32; n];
        for i in 1..n {
            run[i] = run[i - 1] + if nums[i] % k != nums[i - 1] % k { 1 } else { 0 };
        }
        let quot: Vec<i64> = nums.iter().map(|&v| (v / k) as i64).collect();
        // Persistent segment tree over the compressed quotients: version i
        // counts the occurrences among nums[0..i-1], so the window [l, r]
        // is version r + 1 minus version l. Node 0 is the empty version.
        let mut vals = quot.clone();
        vals.sort_unstable();
        vals.dedup();
        let m = vals.len();
        let mut left_child: Vec<usize> = Vec::with_capacity(20 * n + 10);
        let mut right_child: Vec<usize> = Vec::with_capacity(20 * n + 10);
        let mut node_count: Vec<i64> = Vec::with_capacity(20 * n + 10);
        let mut node_sum: Vec<i64> = Vec::with_capacity(20 * n + 10);
        left_child.push(0);
        right_child.push(0);
        node_count.push(0);
        node_sum.push(0);
        let mut roots = vec![0usize; n + 1];
        for i in 0..n {
            // Path-copy one root-to-leaf route into fresh nodes; the
            // untaken children keep pointing at the previous version.
            let pos = vals.partition_point(|&candidate| candidate < quot[i]);
            let mut old = roots[i];
            let mut node = left_child.len();
            left_child.push(left_child[old]);
            right_child.push(right_child[old]);
            node_count.push(node_count[old] + 1);
            node_sum.push(node_sum[old] + quot[i]);
            roots[i + 1] = node;
            let (mut lo, mut hi) = (0usize, m - 1);
            while lo < hi {
                let mid = (lo + hi) / 2;
                let go_left = pos <= mid;
                old = if go_left { left_child[old] } else { right_child[old] };
                let child = left_child.len();
                left_child.push(left_child[old]);
                right_child.push(right_child[old]);
                node_count.push(node_count[old] + 1);
                node_sum.push(node_sum[old] + quot[i]);
                if go_left {
                    left_child[node] = child;
                    hi = mid;
                } else {
                    right_child[node] = child;
                    lo = mid + 1;
                }
                node = child;
            }
        }
        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let (l, r) = (query[0] as usize, query[1] as usize);
            if run[l] != run[r] {
                result.push(-1);
                continue;
            }
            let (mut a, mut b) = (roots[l], roots[r + 1]);
            let window_sum = node_sum[b] - node_sum[a];
            let size = (r - l + 1) as i64;
            let mut need = (size + 1) / 2;
            let mut below_count = 0i64;
            let mut below_sum = 0i64;
            let (mut lo, mut hi) = (0usize, m - 1);
            while lo < hi {
                let mid = (lo + hi) / 2;
                let left_count = node_count[left_child[b]] - node_count[left_child[a]];
                if need <= left_count {
                    a = left_child[a];
                    b = left_child[b];
                    hi = mid;
                } else {
                    need -= left_count;
                    below_count += left_count;
                    below_sum += node_sum[left_child[b]] - node_sum[left_child[a]];
                    a = right_child[a];
                    b = right_child[b];
                    lo = mid + 1;
                }
            }
            let median = vals[lo];
            // Below-median elements climb by their shortfall; elements at or
            // above descend by their excess; equals contribute nothing.
            result.push(median * below_count - below_sum + (window_sum - below_sum - median * (size - below_count)));
        }
        result
    }
}
