impl Solution {
    pub fn minimize_xor(num1: i32, num2: i32) -> i32 {
        // x must carry exactly popcount(num2) set bits and differ from
        // num1 as little as possible. A bit kept from num1 contributes 0
        // to the xor, so spend the budget first on num1's highest set
        // bits (they dominate the value), then set the lowest zero bits
        // with whatever budget remains.
        let mut budget = num2.count_ones() as i32;
        let mut x = 0;
        for i in (0..31).rev() {
            let bit = num1 & (1 << i);
            if bit != 0 && budget > 0 {
                x |= bit;
                budget -= 1;
            }
        }
        let mut i = 0;
        while i < 31 && budget > 0 {
            if x & (1 << i) == 0 {
                x |= 1 << i;
                budget -= 1;
            }
            i += 1;
        }
        x
    }
}
