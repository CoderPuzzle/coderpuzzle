use std::collections::HashMap;

impl Solution {
    pub fn maximum_beauty(flowers: Vec<i32>) -> i32 {
        // A valid garden keeps two equally beautiful endpoints i < j and,
        // since removal is free, every positive strictly between them: its
        // sum is 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0)
        // below k. seen[v] tracks the smallest P[i+1] over past occurrences
        // of v (P only grows, so that is the first one). Totals stay under
        // 1e5 * 1e4 + 2e4 < i32::MAX, so i32 is exact throughout.
        let mut seen: HashMap<i32, i32> = HashMap::new();
        let mut pos = 0;
        let mut answer = i32::MIN;
        for &v in &flowers {
            if let Some(&best) = seen.get(&v) {
                answer = answer.max(2 * v + pos - best);
            }
            if v > 0 {
                pos += v;
            }
            seen.entry(v).and_modify(|best| *best = (*best).min(pos)).or_insert(pos);
        }
        answer
    }
}
