impl Solution {
    pub fn number_of_arrays(differences: Vec<i32>, lower: i32, upper: i32) -> i32 {
        let mut prefix = 0_i64;
        let mut minimum = 0_i64;
        let mut maximum = 0_i64;
        for difference in differences {
            prefix += difference as i64;
            minimum = minimum.min(prefix);
            maximum = maximum.max(prefix);
        }
        let available = upper as i64 - lower as i64 - (maximum - minimum) + 1;
        available.max(0) as i32
    }
}
