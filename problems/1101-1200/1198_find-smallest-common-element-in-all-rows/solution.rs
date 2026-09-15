impl Solution {
    pub fn smallest_common_element(mat: Vec<Vec<i32>>) -> i32 {
        let mut tally = vec![0i32; 10001];
        for row in &mat {
            for &value in row {
                tally[value as usize] += 1;
            }
        }
        for value in 1..=10000 {
            if tally[value] == mat.len() as i32 {
                // Strictly increasing rows never repeat a value, so only a
                // value present in every row can reach count m.
                return value as i32;
            }
        }
        -1
    }
}
