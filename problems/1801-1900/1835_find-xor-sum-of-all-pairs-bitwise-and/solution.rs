impl Solution {
    // AND distributes over XOR: (a&b)^(a&c) = a&(b^c). Folding that
    // repeatedly collapses all n*m pair terms to xor(arr1) & xor(arr2).
    pub fn get_xor_sum(arr1: Vec<i32>, arr2: Vec<i32>) -> i32 {
        let mut x = 0;
        for a in &arr1 {
            x ^= *a;
        }
        let mut y = 0;
        for b in &arr2 {
            y ^= *b;
        }
        x & y
    }
}
