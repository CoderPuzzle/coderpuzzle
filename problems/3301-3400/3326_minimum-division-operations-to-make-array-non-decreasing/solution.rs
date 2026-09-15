// A division replaces a composite x by its smallest prime factor (x's
// greatest proper divisor), and primes are stuck: their greatest proper
// divisor is 1, so dividing leaves them unchanged. Every element therefore
// ends as itself, or — for one operation — as its smallest prime factor.
// Scan from the right keeping the value the previous (righter) slot
// settled on: keep x when it fits (no operation, and the loosest bound for
// the left neighbor), otherwise divide once when the smallest prime factor
// fits, else the array is impossible. Smallest prime factors up to
// max(nums) come from one sieve pass.
impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let limit = *nums.iter().max().unwrap() as usize;
        let mut spf = vec![0usize; limit + 1];
        for i in 2..=limit {
            if spf[i] == 0 {
                let mut j = i;
                while j <= limit {
                    if spf[j] == 0 {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
        }
        let mut ops = 0i32;
        let mut bound = limit + 1;
        for &x in nums.iter().rev() {
            let x = x as usize;
            if x <= bound {
                bound = x;
            } else if x > 1 && spf[x] <= bound {
                ops += 1;
                bound = spf[x];
            } else {
                return -1;
            }
        }
        ops
    }
}
