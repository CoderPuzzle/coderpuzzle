impl Solution {
    pub fn count_bits(n: i32) -> Vec<i32> {
        let mut ans = vec![0i32; n as usize + 1];
        for i in 1..=n {
            // value & (value - 1) clears the lowest set bit in one AND, so
            // the loop body runs exactly popcount(i) times — never once per
            // bit position.
            let mut count = 0;
            let mut value = i;
            while value != 0 {
                value &= value - 1;
                count += 1;
            }
            ans[i as usize] = count;
        }
        ans
    }
}
