// A query (x, y) sums the stride x, x+y, x+2y, ... — O(n/y) per query
// when walked directly, which stays cheap only for large y. Split the
// queries on B ~ sqrt(n): every y <= B gets a residue table pre[y]
// built right-to-left with pre[y][i] = (nums[i] + pre[y][i+y]) % MOD,
// making each such query one lookup, while any y > B strides at most
// n/B ~ B indices. A full suffix sums to 5*10^4 * 10^9 = 5*10^13
// before the modulus, so accumulation runs in 64 bits and table rows
// store plain 32-bit mod values.
impl Solution {
    pub fn solve(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let limit = (n as f64).sqrt() as usize;
        // pre[y][i] = (nums[i] + pre[y][i + y]) % MOD — the answer of query (i, y)
        let mut pre: Vec<Vec<i32>> = vec![Vec::new(); limit + 1];
        for y in 1..=limit {
            let mut row = vec![0i32; n];
            for i in (0..n).rev() {
                let tail = if i + y < n { row[i + y] as i64 } else { 0 };
                row[i] = ((nums[i] as i64 + tail) % MOD) as i32;
            }
            pre[y] = row;
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let x = query[0] as usize;
            let y = query[1] as usize;
            if y <= limit {
                answer.push(pre[y][x]);
            } else {
                let mut total: i64 = 0;
                let mut j = x;
                while j < n {
                    total += nums[j] as i64;
                    j += y;
                }
                answer.push((total % MOD) as i32);
            }
        }
        answer
    }
}
