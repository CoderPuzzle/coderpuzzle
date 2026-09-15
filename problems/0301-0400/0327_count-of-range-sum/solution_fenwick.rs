impl Solution {
    pub fn count_range_sum(nums: Vec<i32>, lower: i32, upper: i32) -> i32 {
        let n = nums.len();
        // Range sums become pairs: count i < j with
        // prefix[j] - prefix[i] in [lower, upper] (leading 0 included).
        let mut prefix: Vec<i64> = vec![0; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // Fenwick tree over the coordinate-compressed prefix values: rank r
        // (1-based) counts how many inserted prefixes carry ranks[r - 1].
        let mut ranks: Vec<i64> = prefix.clone();
        ranks.sort_unstable();
        ranks.dedup();
        let m = ranks.len();
        let mut tree: Vec<i32> = vec![0; m + 1];
        let lower = lower as i64;
        let upper = upper as i64;
        // Insert one prefix into the tree at its rank.
        fn add(value: i64, ranks: &Vec<i64>, tree: &mut Vec<i32>, m: usize) {
            let mut rank = ranks.partition_point(|&r| r <= value);
            while rank <= m {
                tree[rank] += 1;
                rank += rank & rank.wrapping_neg();
            }
        }
        // How many inserted prefixes are at most bound.
        fn count_at_most(bound: i64, ranks: &Vec<i64>, tree: &Vec<i32>) -> i32 {
            let mut rank = ranks.partition_point(|&r| r <= bound);
            let mut total = 0;
            while rank > 0 {
                total += tree[rank];
                rank -= rank & rank.wrapping_neg();
            }
            total
        }
        let mut count: i64 = 0;
        add(prefix[0], &ranks, &mut tree, m);
        for j in 1..=n {
            let p = prefix[j];
            // An earlier prefix e qualifies when lower <= p - e <= upper,
            // i.e. e lies in [p - upper, p - lower]; both bounds come off
            // the tree as rank-prefix counts.
            count += (count_at_most(p - lower, &ranks, &tree) - count_at_most(p - upper - 1, &ranks, &tree)) as i64;
            // Insert only after querying, so a prefix never pairs itself.
            add(p, &ranks, &mut tree, m);
        }
        count as i32
    }
}
