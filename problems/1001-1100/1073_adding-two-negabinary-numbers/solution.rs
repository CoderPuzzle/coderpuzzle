impl Solution {
    // Walk both arrays from the least-significant digit (the end)
    // toward the most-significant, keeping a running carry. At each
    // column, total = d1 + d2 + carry can temporarily fall outside
    // {0, 1} (it even goes negative), so the digit and the next carry
    // are pulled out with bitwise ops instead of a sign-prone mod/div:
    // total & 1 is the digit, because in two's-complement form the low
    // bit of total already equals total's floor-mod-2 regardless of
    // sign. The next carry is -(total >> 1), where >> is Rust's
    // arithmetic (sign-extending) shift on i32, matching the base -2
    // identity total = digit + (-2) * carry. The carry provably stays
    // within {-1, 0, 1} the whole way, so nothing overflows.
    pub fn add_negabinary(arr1: Vec<i32>, arr2: Vec<i32>) -> Vec<i32> {
        let mut i = arr1.len() as i32 - 1;
        let mut j = arr2.len() as i32 - 1;
        let mut carry = 0;
        let mut digits: Vec<i32> = Vec::new();
        while i >= 0 || j >= 0 || carry != 0 {
            let d1 = if i >= 0 { arr1[i as usize] } else { 0 };
            let d2 = if j >= 0 { arr2[j as usize] } else { 0 };
            let total = d1 + d2 + carry;
            digits.push(total & 1);
            carry = -(total >> 1);
            i -= 1;
            j -= 1;
        }
        digits.reverse();
        let mut k = 0;
        while k < digits.len() - 1 && digits[k] == 0 {
            k += 1;
        }
        digits[k..].to_vec()
    }
}
