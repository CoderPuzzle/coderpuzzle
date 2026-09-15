use std::collections::HashMap;

impl Solution {
    pub fn maximum_width(planks: Vec<i32>) -> i32 {
        // For a fixed fence height h: every height-h plank joins the fence
        // as is, and planks of any other height can only contribute as
        // halves of disjoint pairs summing to h. A height-h plank itself can
        // never be in such a pair (its partner would need height 0), so
        // singles and pairs never compete for a plank: their counts add.
        let mut freq: HashMap<i32, i32> = HashMap::new();
        for plank in &planks {
            *freq.entry(*plank).or_insert(0) += 1;
        }
        let mut heights: Vec<i32> = freq.keys().copied().collect();
        heights.sort_unstable();
        // bucket[s] = number of disjoint pairs of planks whose heights sum
        // to s, accumulated once over every unordered pair of height values.
        let mut bucket: HashMap<i32, i32> = HashMap::new();
        for (i, &x) in heights.iter().enumerate() {
            let count_x = freq[&x];
            if count_x >= 2 {
                *bucket.entry(2 * x).or_insert(0) += count_x / 2;
            }
            for &y in &heights[i + 1..] {
                let pairs = count_x.min(freq[&y]);
                *bucket.entry(x + y).or_insert(0) += pairs;
            }
        }
        // Achievable fence heights are exactly the original heights plus
        // the pairwise sums; a lone plank already builds a width-1 fence.
        let mut best = *freq.values().max().unwrap();
        for (&sum, &pairs) in bucket.iter() {
            let total = pairs + freq.get(&sum).copied().unwrap_or(0);
            best = best.max(total);
        }
        best
    }
}
