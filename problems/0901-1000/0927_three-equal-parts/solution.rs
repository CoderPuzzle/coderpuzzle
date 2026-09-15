impl Solution {
    pub fn three_equal_parts(arr: Vec<i32>) -> Vec<i32> {
        // Equal parts repeat one binary value, so the array's 1s must divide
        // into three equal counts; the third part's 1s are the final
        // k = total/3 ones, and the suffix from its first 1 to the end is the
        // exact bit pattern every part must show after its own leading zeros.
        // Both earlier parts begin at a known 1 — the array's first, and the
        // (k+1)-th — so comparing the L bits past each anchor against that
        // suffix decides everything, and the cut points sit exactly L bits
        // past the anchors.
        let total: i32 = arr.iter().sum();
        if total == 0 {
            return vec![0, 2];
        }
        if total % 3 != 0 {
            return vec![-1, -1];
        }
        let k = total / 3;
        let (mut first, mut second, mut third) = (-1i32, -1i32, -1i32);
        let mut seen = 0;
        for (index, &value) in arr.iter().enumerate() {
            if value == 1 {
                seen += 1;
                if seen == 1 {
                    first = index as i32;
                } else if seen == k + 1 {
                    second = index as i32;
                } else if seen == 2 * k + 1 {
                    third = index as i32;
                }
            }
        }
        let length = arr.len() as i32 - 1 - third;
        for &anchor in &[first, second] {
            for offset in 0..=length {
                if arr[(anchor + offset) as usize] != arr[(third + offset) as usize] {
                    return vec![-1, -1];
                }
            }
        }
        vec![first + length, second + length + 1]
    }
}
