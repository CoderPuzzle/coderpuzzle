impl Solution {
    pub fn sum_of_encrypted_int(nums: Vec<i32>) -> i32 {
        // Encrypting x keeps its digit count but replaces every digit with
        // the largest one, so the result is largest * repunit(length). Both
        // fall out of one digit scan: p grows as 1, 11, 111, ... while m
        // tracks the max digit seen.
        let mut total = 0;
        for num in nums {
            let mut value = num;
            let mut largest = 0;
            let mut repunit = 0;
            while value > 0 {
                largest = largest.max(value % 10);
                repunit = repunit * 10 + 1;
                value /= 10;
            }
            total += largest * repunit;
        }
        total
    }
}
