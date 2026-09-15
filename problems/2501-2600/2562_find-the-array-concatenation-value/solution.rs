impl Solution {
    pub fn find_the_array_conc_val(nums: Vec<i32>) -> i64 {
        // Two pointers eat the array from both ends; every round folds
        // first * 10^digits(last) + last into the running value. This is
        // exactly concat(first, last) without any string round-trip.
        let mut answer: i64 = 0;
        let mut left: usize = 0;
        let mut right = nums.len() as i64 - 1;
        while (left as i64) < right {
            // Peel decimal digits off the last element to build the shift
            // factor the concatenation needs.
            let mut scale: i64 = 10;
            let mut tail = nums[right as usize];
            while tail >= 10 {
                tail /= 10;
                scale *= 10;
            }
            answer += nums[left] as i64 * scale + nums[right as usize] as i64;
            left += 1;
            right -= 1;
        }
        // Odd length: the surviving middle element joins the total alone.
        if left as i64 == right {
            answer += nums[left] as i64;
        }
        answer
    }
}
