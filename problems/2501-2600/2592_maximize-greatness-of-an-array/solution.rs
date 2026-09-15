impl Solution {
    pub fn maximize_greatness(mut nums: Vec<i32>) -> i32 {
        // Sort the array; then scan a second sorted copy of the same
        // multiset with a fast pointer that always offers the smallest not
        // yet committed value strictly greater than the current element.
        // Spending the cheapest sufficient value on each position in
        // increasing order is an exchange-argument optimum, so the number
        // of commitments is the greatness.
        let mut supply = nums.clone();
        supply.sort_unstable();
        nums.sort_unstable();
        let mut count = 0;
        let mut j = 0;
        for x in &nums {
            while j < supply.len() && supply[j] <= *x {
                j += 1;
            }
            if j == supply.len() {
                break;
            }
            count += 1;
            j += 1;
        }
        count
    }
}
