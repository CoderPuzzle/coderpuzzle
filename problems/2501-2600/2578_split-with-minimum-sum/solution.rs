impl Solution {
    pub fn split_num(num: i32) -> i32 {
        // Greedy over sorted digits: ascending order, dealt alternately
        // to num1 and num2, puts the small digits where they carry the
        // most significance and interleaves so neither number grows a
        // fat leading digit; the exchange argument shows any other deal
        // has both parts at least as large. Sums stay under 2*10^5 (at
        // most 5 significant digits per part), well inside i32.
        let mut digits: Vec<u8> = num.to_string().into_bytes();
        digits.sort_unstable();
        let mut nums = [0i32; 2];
        for (i, d) in digits.iter().enumerate() {
            nums[i % 2] = nums[i % 2] * 10 + (d - b'0') as i32;
        }
        nums[0] + nums[1]
    }
}
