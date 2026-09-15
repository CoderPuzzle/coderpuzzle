impl Solution {
    pub fn get_sum(a: Vec<i32>) -> i64 {
        let n = a.len();
        let (mut d1, mut d2) = (vec![0usize; n], vec![0usize; n]);
        let (mut l, mut r) = (0usize, -1isize);
        for i in 0..n {
            let mut k = if i as isize > r {
                1
            } else {
                d1[(l as isize + r - i as isize) as usize].min((r - i as isize + 1) as usize)
            };
            while i >= k && i + k < n && a[i - k] == a[i + k] {
                k += 1
            }
            d1[i] = k;
            if (i + k - 1) as isize > r {
                l = i - k + 1;
                r = (i + k - 1) as isize
            }
        }
        l = 0;
        r = -1;
        for i in 0..n {
            let mut k = if i as isize > r {
                0
            } else {
                d2[(l as isize + r - i as isize + 1) as usize].min((r - i as isize + 1) as usize)
            };
            while i > k && i + k < n && a[i - k - 1] == a[i + k] {
                k += 1
            }
            d2[i] = k;
            if k > 0 && (i + k - 1) as isize > r {
                l = i - k;
                r = (i + k - 1) as isize
            }
        }
        let mut p = vec![0i64; n + 1];
        for i in 0..n {
            p[i + 1] = p[i] + a[i] as i64
        }
        let mut ans = 0;
        for i in 0..n {
            ans = ans.max(p[i + d1[i]] - p[i - d1[i] + 1]);
            ans = ans.max(p[i + d2[i]] - p[i - d2[i]])
        }
        ans
    }
}
