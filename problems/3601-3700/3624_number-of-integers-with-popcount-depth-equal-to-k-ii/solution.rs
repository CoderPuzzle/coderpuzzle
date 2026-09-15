impl Solution {
    pub fn popcount_depth(nums: Vec<i64>, queries: Vec<Vec<i64>>) -> Vec<i32> {
        // Every popcount chain collapses to 1 in at most four steps for
        // values <= 10^15, so depths live in 0..4 (k may still ask for 5,
        // whose tree simply stays empty). Six Fenwick trees, one per depth
        // class, each marking the indices currently holding that depth: a
        // query is a prefix-difference on tree[k], an update is two point
        // flips. All loops are iterative, and every count is <= n, so
        // 32-bit answers are safe while values ride in 64-bit.
        let n = nums.len();
        let mut cur = nums;
        let mut trees: Vec<Vec<i32>> = vec![vec![0; n + 1]; 6];
        let depth = |mut x: i64| -> usize {
            let mut d = 0;
            while x > 1 {
                x = x.count_ones() as i64;
                d += 1;
            }
            d
        };
        let add = |trees: &mut Vec<Vec<i32>>, n: usize, k: usize, i: usize, delta: i32| {
            let mut i = i + 1;
            while i <= n {
                trees[k][i] += delta;
                i += i & i.wrapping_neg();
            }
        };
        let pref = |trees: &Vec<Vec<i32>>, k: usize, i: usize| -> i32 {
            let mut total = 0;
            let mut i = i;
            while i > 0 {
                total += trees[k][i];
                i -= i & i.wrapping_neg();
            }
            total
        };
        for (i, v) in cur.iter().enumerate() {
            add(&mut trees, n, depth(*v), i, 1);
        }
        let mut answer = Vec::with_capacity(queries.len());
        for q in &queries {
            if q[0] == 1 {
                let k = q[3] as usize;
                // pref sums positions 1..=i, so the [l, r] count is
                // pref(r + 1) - pref(l).
                answer.push(pref(&trees, k, (q[2] + 1) as usize) - pref(&trees, k, q[1] as usize));
            } else {
                let idx = q[1] as usize;
                add(&mut trees, n, depth(cur[idx]), idx, -1);
                cur[idx] = q[2];
                add(&mut trees, n, depth(cur[idx]), idx, 1);
            }
        }
        answer
    }
}
