impl Solution {
    // Ones shortcut: an existing 1 absorbs every other element with
    // exactly one operation each. Otherwise locate the shortest window
    // whose overall gcd is 1: L - 1 operations fold its L elements into a
    // single 1 (each op merges the window's span by at most one element),
    // then the remaining n - 1 elements cost one operation apiece.
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        let ones = nums.iter().filter(|&&v| v == 1).count() as i32;
        if ones > 0 {
            return n - ones;
        }
        let mut best = n + 1;
        for i in 0..n {
            let mut g = 0_i32;
            for j in i..n {
                g = gcd(g, nums[j as usize]);
                if g == 1 {
                    // The first j making this window's gcd reach 1 is also
                    // its shortest completion for this start index.
                    best = best.min(j - i + 1);
                    break;
                }
            }
        }
        if best > n {
            -1
        } else {
            best - 1 + (n - 1)
        }
    }
}

fn gcd(a: i32, b: i32) -> i32 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
