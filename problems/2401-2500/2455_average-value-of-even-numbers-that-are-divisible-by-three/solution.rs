impl Solution {
    pub fn average_value(nums: Vec<i32>) -> i32 {
        // Divisible by 2 and by 3 means divisible by 6 (hint 2). Sum the
        // multiples of 6, count them, and floor-divide; with none present
        // return 0 as the statement asks.
        let mut total = 0i32;
        let mut count = 0i32;
        for value in nums {
            if value % 6 == 0 {
                total += value;
                count += 1;
            }
        }
        if count == 0 {
            0
        } else {
            total / count
        }
    }
}
