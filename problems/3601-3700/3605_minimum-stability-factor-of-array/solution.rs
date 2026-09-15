impl Solution {
    pub fn min_stable(nums: Vec<i32>, maxC: i32) -> i32 {
        let n = nums.len();

        // Sparse table: st[k][i] is the gcd of nums[i .. i+2^k-1]; two
        // rows tile any query window, so every window gcd is O(1) after
        // the O(n log n) build.
        let log = bits_len(n);
        let mut st: Vec<Vec<i32>> = Vec::with_capacity(log);
        st.push(nums.clone());
        for k in 1..log {
            let half = 1 << (k - 1);
            let length = n - (1 << k) + 1;
            let prev = &st[k - 1];
            let mut row = Vec::with_capacity(length);
            for i in 0..length {
                row.push(gcd(prev[i], prev[i + half]));
            }
            st.push(row);
        }

        let range_gcd = |left: usize, right: usize| -> i32 {
            let len = right - left + 1;
            let k = bits_len(len) - 1;
            let span = 1 << k;
            gcd(st[k][left], st[k][right - span + 1])
        };

        // Feasibility for a target length k: every window of size k+1 must
        // be broken. Editing one element to 1 breaks every window that
        // contains it, so hitting a window's rightmost element covers the
        // maximal run of later window starts — the classic fixed-length
        // interval point cover, greedily optimal.
        let feasible = |k: usize| -> bool {
            let width = k + 1;
            if width > n {
                return true;
            }
            let mut edits = 0usize;
            let mut covered: isize = -1;
            let mut start = 0usize;
            while start + width <= n {
                if (start as isize) > covered {
                    if range_gcd(start, start + width - 1) > 1 {
                        covered = (start + width - 1) as isize;
                        edits += 1;
                        if edits as i32 > maxC {
                            return false;
                        }
                    }
                }
                start += 1;
            }
            true
        };

        let (mut lo, mut hi) = (0usize, n);
        while lo < hi {
            let mid = (lo + hi) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}

fn bits_len(mut x: usize) -> usize {
    let mut count = 0usize;
    while x > 0 {
        x >>= 1;
        count += 1;
    }
    count
}

fn gcd(a: i32, b: i32) -> i32 {
    let (mut a, mut b) = (a, b);
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
