impl Solution {
    pub fn count_different_subsequence_gcds(nums: Vec<i32>) -> i32 {
        let mut max_val = 0usize;
        for &v in &nums {
            if v as usize > max_val {
                max_val = v as usize;
            }
        }
        let mut present = vec![false; max_val + 1];
        for &v in &nums {
            present[v as usize] = true;
        }
        fn gcd(mut a: usize, mut b: usize) -> usize {
            while b != 0 {
                let t = a % b;
                a = b;
                b = t;
            }
            a
        }
        let mut count = 0usize;
        // g is achievable iff the gcd of ALL present multiples of g is exactly g:
        // taking every divisible element minimizes the gcd, so no other subset can do better.
        for g in 1..=max_val {
            let mut running = 0usize; // gcd(0, x) = x, so 0 is the identity seed
            let mut multiple = g;
            while multiple <= max_val {
                if present[multiple] {
                    running = gcd(running, multiple);
                    if running == g {
                        // Folding more multiples can only shrink the gcd — confirmed, stop early.
                        count += 1;
                        break;
                    }
                }
                multiple += g;
            }
        }
        count as i32
    }
}
