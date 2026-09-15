impl Solution {
    pub fn find_the_prefix_common_array(a: Vec<i32>, b: Vec<i32>) -> Vec<i32> {
        // One shared walk bumps a frequency counter for each value; because
        // both arrays are permutations, a counter reaching 2 means that value
        // now appears in both prefixes, so each hit raises the running total.
        let mut seen = vec![0i32; a.len() + 1];
        let mut common: i32 = 0;
        let mut result = Vec::with_capacity(a.len());
        for index in 0..a.len() {
            seen[a[index] as usize] += 1;
            if seen[a[index] as usize] == 2 {
                common += 1;
            }
            seen[b[index] as usize] += 1;
            if seen[b[index] as usize] == 2 {
                common += 1;
            }
            result.push(common);
        }
        result
    }
}
