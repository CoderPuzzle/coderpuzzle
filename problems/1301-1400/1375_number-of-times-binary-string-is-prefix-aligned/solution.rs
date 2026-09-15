impl Solution {
    pub fn num_times_all_blue(flips: Vec<i32>) -> i32 {
        let mut rightmost = 0i32;
        let mut count = 0i32;
        for (i, &position) in flips.iter().enumerate() {
            rightmost = rightmost.max(position);
            if rightmost == i as i32 + 1 {
                count += 1;
            }
        }
        count
    }
}
