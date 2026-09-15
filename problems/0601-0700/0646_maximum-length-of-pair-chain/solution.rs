impl Solution {
    pub fn find_longest_chain(pairs: Vec<Vec<i32>>) -> i32 {
        let mut pairs = pairs;
        // Taking the compatible pair that ends earliest leaves the most room,
        // so sorting by right endpoint makes a single greedy pass optimal.
        pairs.sort_by_key(|p| p[1]);
        let mut length = 0;
        let mut current_end = i64::MIN;
        for pair in &pairs {
            // Strict > encodes the strict b < c rule; touching pairs can't chain.
            if (pair[0] as i64) > current_end {
                length += 1;
                current_end = pair[1] as i64;
            }
        }
        length
    }
}
