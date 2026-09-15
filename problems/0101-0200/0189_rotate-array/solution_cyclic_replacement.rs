impl Solution {
    pub fn rotate(mut nums: Vec<i32>, k: i32) -> Vec<i32> {
        // Ownership hands over the whole allocation, so the cycle walks
        // rewrite it in place — no second array is ever built.
        let n = nums.len();
        // A rotation by n steps is the identity, so any larger k wraps
        // around to k % n — normalize before chasing cycles.
        let k = (k as usize) % n;
        // The positions split into gcd(n, k) cycles under i -> (i + k) % n,
        // and walking each cycle carries its values straight to their final
        // slots with only one element in flight at a time. Euclid's count:
        // gcd(n, 0) is n, so a fully-normalized k of zero collapses into n
        // one-position cycles that change nothing.
        let mut cycles = n;
        let mut rest = k;
        while rest != 0 {
            let temp = cycles % rest;
            cycles = rest;
            rest = temp;
        }
        for start in 0..cycles {
            let mut carried = nums[start];
            let mut j = start;
            loop {
                // Drop the carried element into its rightful slot and catch
                // the one displaced; the cycle closes back at the start.
                let nxt = (j + k) % n;
                let picked = nums[nxt];
                nums[nxt] = carried;
                carried = picked;
                j = nxt;
                if nxt == start {
                    break;
                }
            }
        }
        nums
    }
}
