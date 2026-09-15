impl Solution {
    // Removing scattered characters only charges their two extreme
    // indices, so any optimal selection widens to one contiguous block
    // [i, j): padding it never raises the score, and dropping more kept
    // characters can only help the subsequence check. Greedy walks pin
    // how far each flank reaches into s. pre[i] is the earliest end in
    // s of a match of t[:i] (-1 marks the empty prefix) and stays
    // finite up to L; suf[j] is the latest start of a backward match of
    // t[j:] and stays finite from first_suf. The block works iff
    // pre[i] < suf[j]; pre rises with i and the smallest feasible j
    // rises with it, so one forward pointer prices every split. Edge
    // windows (drop whole tail/head/all) are the candidates j = m and
    // i = 0 and fall out of the same sentinels.
    pub fn minimum_score(s: String, t: String) -> i32 {
        let sc = s.as_bytes();
        let tc = t.as_bytes();
        let (n, m) = (sc.len(), tc.len());
        let mut pre = vec![-1i32; m + 1];
        let mut j: i32 = 0;
        let mut longest_pre: usize = 0;
        for i in 1..=m {
            while (j as usize) < n && sc[j as usize] != tc[i - 1] {
                j += 1;
            }
            if j as usize == n {
                break;
            }
            pre[i] = j;
            j += 1;
            longest_pre = i;
        }
        if longest_pre == m {
            return 0;
        }
        let mut suf = vec![0i32; m + 1];
        let mut rj: i32 = n as i32 - 1;
        let mut first_suf: usize = m;
        for k in (0..m).rev() {
            while rj >= 0 && sc[rj as usize] != tc[k] {
                rj -= 1;
            }
            if rj < 0 {
                break;
            }
            suf[k] = rj;
            rj -= 1;
            first_suf = k;
        }
        let mut ans = (m - longest_pre) as i32;
        if (first_suf as i32) < ans {
            ans = first_suf as i32;
        }
        let mut p: i32 = 1;
        for i in 0..=longest_pre {
            if p < i as i32 + 1 {
                p = i as i32 + 1;
            }
            if p < first_suf as i32 {
                p = first_suf as i32;
            }
            while (p as usize) < m && suf[p as usize] <= pre[i] {
                p += 1;
            }
            if (p as usize) < m && p - (i as i32) < ans {
                ans = p - (i as i32);
            }
        }
        ans
    }
}
