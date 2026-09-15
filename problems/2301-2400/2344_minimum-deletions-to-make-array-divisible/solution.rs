impl Solution {
    // An element x can head nums only if it divides every value in
    // numsDivide; one common divisor divides their GCD, so reduce the
    // target once and count the sorted elements below the smallest
    // divisor of it.
    pub fn min_operations(mut nums: Vec<i32>, nums_divide: Vec<i32>) -> i32 {
        let mut g: u32 = 0;
        for value in nums_divide {
            g = gcd(g, value as u32);
        }
        nums.sort_unstable();
        let mut deletions = 0i32;
        for value in nums {
            if g % (value as u32) == 0 {
                return deletions;
            }
            deletions += 1;
        }
        -1
    }
}

fn gcd(mut a: u32, mut b: u32) -> u32 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
