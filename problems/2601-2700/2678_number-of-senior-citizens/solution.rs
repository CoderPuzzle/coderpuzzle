impl Solution {
    pub fn count_seniors(details: Vec<String>) -> i32 {
        // The age is the two-digit field at offsets 11-12; char-code
        // arithmetic decodes it without building a substring. The count is
        // at most details.len() <= 100, so i32 is plenty.
        let mut count = 0;
        for record in &details {
            let digits = record.as_bytes();
            let age = (digits[11] - b'0') as i32 * 10 + (digits[12] - b'0') as i32;
            if age > 60 {
                count += 1;
            }
        }
        count
    }
}
