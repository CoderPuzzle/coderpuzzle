impl Solution {
    pub fn k_items_with_maximum_sum(num_ones: i32, num_zeros: i32, num_neg_ones: i32, k: i32) -> i32 {
        // Spend the draw budget on the best items first: every +1 you
        // can take, then the 0s (free filler), then pay one point per
        // forced -1. Three ranges of k, three closed-form answers.
        if k <= num_ones {
            return k;
        }
        if k <= num_ones + num_zeros {
            return num_ones;
        }
        num_ones - (k - num_ones - num_zeros)
    }
}
