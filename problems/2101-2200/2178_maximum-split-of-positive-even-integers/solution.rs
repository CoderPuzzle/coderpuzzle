impl Solution {
    pub fn maximum_even_split(final_sum: i64) -> Vec<i64> {
        // An odd total can never be a sum of even numbers. Take the
        // smallest evens while the leftover allows a strictly larger final
        // part. final_sum reaches 10^10, which needs i64.
        if final_sum % 2 != 0 {
            return vec![];
        }
        let mut parts: Vec<i64> = Vec::new();
        let mut take: i64 = 2;
        let mut remaining = final_sum;
        while remaining - take > take {
            parts.push(take);
            remaining -= take;
            take += 2;
        }
        parts.push(remaining);
        parts
    }
}
