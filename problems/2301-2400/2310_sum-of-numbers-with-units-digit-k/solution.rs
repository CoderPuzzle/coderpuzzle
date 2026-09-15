impl Solution {
    pub fn minimum_numbers(num: i32, k: i32) -> i32 {
        if num == 0 {
            return 0;
        }
        let base = if k == 0 { 10 } else { k };
        let mut count = 1;
        while count * base <= num {
            if (num - count * base) % 10 == 0 {
                return count;
            }
            count += 1;
        }
        -1
    }
}
