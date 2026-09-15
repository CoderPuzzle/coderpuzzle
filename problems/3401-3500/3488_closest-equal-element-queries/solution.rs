use std::collections::HashMap;

impl Solution {
    // Group indices by value; each occurrence list is sorted. Per query,
    // binary-search the list and take the nearer of the two circular
    // neighbors.
    pub fn solve_queries(nums: Vec<i32>, queries: Vec<i32>) -> Vec<i32> {
        let n = nums.len() as i32;
        let mut pos: HashMap<i32, Vec<i32>> = HashMap::new();
        for (i, &v) in nums.iter().enumerate() {
            pos.entry(v).or_default().push(i as i32);
        }
        let mut ans = Vec::with_capacity(queries.len());
        for &q in &queries {
            let p = &pos[&nums[q as usize]];
            if p.len() == 1 {
                ans.push(-1);
                continue;
            }
            let k = p.partition_point(|&x| x < q);
            let prev = if k > 0 { p[k - 1] } else { p[p.len() - 1] };
            let nxt = if k + 1 < p.len() { p[k + 1] } else { p[0] };
            let dprev = (q - prev).rem_euclid(n);
            let dnxt = (nxt - q).rem_euclid(n);
            ans.push(dprev.min(dnxt));
        }
        ans
    }
}
