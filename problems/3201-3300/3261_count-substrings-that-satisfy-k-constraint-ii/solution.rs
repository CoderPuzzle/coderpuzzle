impl Solution {
    pub fn count_k_constraint_substrings(s: String, k: i32, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let k = k as usize;
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut bounds = vec![0_usize; n];
        let mut left = 0_usize;
        let mut zeros = 0_usize;
        let mut ones = 0_usize;
        for right in 0..n {
            if bytes[right] == b'0' {
                zeros += 1;
            } else {
                ones += 1;
            }
            while zeros > k && ones > k {
                if bytes[left] == b'0' {
                    zeros -= 1;
                } else {
                    ones -= 1;
                }
                left += 1;
            }
            bounds[right] = left;
        }
        let mut pre = vec![0_i64; n + 1];
        for j in 0..n {
            pre[j + 1] = pre[j] + (j + 1 - bounds[j]) as i64;
        }
        let mut next = vec![n; n];
        let mut ptr = n;
        for l in (0..n).rev() {
            while ptr > 0 && bounds[ptr - 1] >= l {
                ptr -= 1;
            }
            next[l] = ptr;
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            let l = query[0] as usize;
            let r = query[1] as usize;
            let j = next[l];
            if j > r {
                let m = (r - l + 1) as i64;
                answer.push(m * (m + 1) / 2);
            } else {
                let d = (j - l) as i64;
                answer.push(pre[r + 1] - pre[j] + d * (d + 1) / 2);
            }
        }
        answer
    }
}
