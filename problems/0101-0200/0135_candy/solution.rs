impl Solution {
    pub fn candy(ratings: Vec<i32>) -> i32 {
        let n = ratings.len();
        // One candy per child is the minimum allowed.
        let mut candies = vec![1i64; n];
        // Left-to-right: enforce the left-neighbor rule with the smallest
        // value exceeding the left neighbor's allotment.
        for i in 1..n {
            if ratings[i] > ratings[i - 1] {
                candies[i] = candies[i - 1] + 1;
            }
        }
        // Right-to-left: enforce the right-neighbor rule symmetrically. The
        // max only raises a count, never lowers it, so these fixes cannot
        // undo the first pass's left-neighbor guarantees.
        for i in (0..n.saturating_sub(1)).rev() {
            if ratings[i] > ratings[i + 1] {
                candies[i] = candies[i].max(candies[i + 1] + 1);
            }
        }
        candies.iter().sum::<i64>() as i32
    }
}
