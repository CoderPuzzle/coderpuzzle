impl Solution {
    pub fn maximum_mex(a: Vec<i32>) -> Vec<i32> {
        let n = a.len();
        let mut f = vec![0; n + 1];
        for &x in &a {
            if x as usize <= n {
                f[x as usize] += 1;
            }
        }
        let mut mex = 0;
        while f[mex] > 0 {
            mex += 1;
        }
        let (mut out, mut i) = (vec![], 0);
        while i < n {
            out.push(mex as i32);
            if mex == 0 {
                if a[i] as usize <= n {
                    f[a[i] as usize] -= 1;
                }
                i += 1;
                continue;
            }
            let mut seen = vec![false; mex];
            let (mut miss, mut next) = (mex, mex);
            while miss > 0 {
                let x = a[i] as usize;
                i += 1;
                if x <= n {
                    f[x] -= 1;
                    if f[x] == 0 && x < next {
                        next = x;
                    }
                }
                if x < mex && !seen[x] {
                    seen[x] = true;
                    miss -= 1;
                }
            }
            mex = next;
        }
        out
    }
}
