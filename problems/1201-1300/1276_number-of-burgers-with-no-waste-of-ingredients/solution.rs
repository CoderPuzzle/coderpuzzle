impl Solution {
    pub fn num_of_burgers(tomato_slices: i32, cheese_slices: i32) -> Vec<i32> {
        // Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling
        // the cheese equation and subtracting isolates jumbo:
        // 2J = tomatoes - 2*cheese. The pair exists iff that value is a
        // non-negative even integer and the back-solved small count is
        // non-negative too.
        let two_jumbo = tomato_slices as i64 - 2i64 * cheese_slices as i64;
        if two_jumbo < 0 || two_jumbo % 2 != 0 {
            return vec![];
        }
        let jumbo = two_jumbo / 2;
        let small = cheese_slices as i64 - jumbo;
        if small < 0 {
            return vec![];
        }
        vec![jumbo as i32, small as i32]
    }
}
