impl Solution {
    pub fn consecutive_set_bits(mut n: i32) -> bool {
        let mut pairs = 0;
        let mut previous = 0;
        while n > 0 {
            let current = n & 1;
            if current == 1 && previous == 1 {
                pairs += 1;
                if pairs > 1 {
                    return false;
                }
            }
            previous = current;
            n >>= 1;
        }
        pairs == 1
    }
}
