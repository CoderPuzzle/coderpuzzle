impl Solution {
    pub fn num_of_unplaced_fruits(fruits: Vec<i32>, baskets: Vec<i32>) -> i32 {
        // The rules fix every decision, so simulate them directly: each fruit
        // takes the leftmost free basket that fits, scanning from index 0.
        let mut used = vec![false; baskets.len()];
        let mut unplaced = 0;
        for &quantity in &fruits {
            let mut j = 0;
            // skip occupied baskets and capacities that are too small
            while j < baskets.len() && (used[j] || baskets[j] < quantity) {
                j += 1;
            }
            // scan ran off the end: nothing fits this fruit
            if j == baskets.len() {
                unplaced += 1;
            } else {
                used[j] = true;
            }
        }
        unplaced
    }
}
