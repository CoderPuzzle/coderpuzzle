// The kth palindrome is the kth half-number mirrored, so each query is one
// string construction; queries past the 9*10^(half-1) supply answer -1.
impl Solution {
    pub fn kth_palindrome(queries: Vec<i32>, int_length: i32) -> Vec<i64> {
        let half = ((int_length + 1) / 2) as u32;
        let count = 9i64 * 10i64.pow(half - 1);
        queries
            .into_iter()
            .map(|query| {
                if query as i64 > count {
                    return -1;
                }
                let prefix = (10i64.pow(half - 1) + query as i64 - 1).to_string();
                let bytes = prefix.as_bytes();
                let mut digits = prefix.clone().into_bytes();
                // Mirror the first intLength/2 digits back onto the end.
                for index in (0..int_length as usize / 2).rev() {
                    digits.push(bytes[index]);
                }
                String::from_utf8(digits).unwrap().parse::<i64>().unwrap()
            })
            .collect()
    }
}
