impl Solution {
    pub fn max_subarrays(n: i32, conflictingPairs: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        // bucket each pair at its smaller element; g[a] collects the larger endpoints
        let mut g: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for pair in &conflictingPairs {
            let mut a = pair[0] as usize;
            let mut b = pair[1] as usize;
            if a > b {
                std::mem::swap(&mut a, &mut b);
            }
            g[a].push(b);
        }
        let mut cnt = vec![0i64; n + 2];
        let mut ans: i64 = 0;
        let mut add: i64 = 0;
        let mut b1 = n + 1;
        let mut b2 = n + 1;
        let mut a = n;
        // sweep left endpoints right to left; b1, b2 are the smallest and
        // second-smallest right endpoint among pairs whose smaller side is >= a
        while a >= 1 {
            for &b in &g[a] {
                if b < b1 {
                    b2 = b1;
                    b1 = b;
                } else if b < b2 {
                    b2 = b;
                }
            }
            // a subarray starting at a stays valid up to just before b1
            ans += (b1 - a) as i64;
            // removing the pair that uniquely supplies b1 relaxes its bound to
            // b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
            cnt[b1] += (b2 - b1) as i64;
            if cnt[b1] > add {
                add = cnt[b1];
            }
            a -= 1;
        }
        ans + add
    }
}
