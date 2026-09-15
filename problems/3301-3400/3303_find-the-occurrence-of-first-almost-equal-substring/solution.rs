impl Solution {
    pub fn min_starting_index(s: String, pattern: String) -> i32 {
        // A window s[i..i+m-1] is almost equal to pattern iff its mismatches
        // fit in one slot: with f = forward match length at i (prefix of
        // pattern) and b = backward match length from the window's right end
        // (suffix of pattern), the window matches exactly when f == m, and
        // when f + b >= m - 1 the runs leave at most one character between
        // them, which a single change absorbs. Both tables come from
        // Z-functions: forward over pattern + sep + s; over the reversals, a
        // prefix of the reversed pattern matching at offset n - 1 - (window
        // end) is exactly a common suffix ending at that window end.
        let n = s.len();
        let m = pattern.len();
        let codes: Vec<i32> = s.bytes().map(|b| b as i32).collect();
        let mut values = Vec::with_capacity(m + 1 + n);
        values.extend(pattern.bytes().map(|b| b as i32));
        values.push(-1);
        values.extend(codes.iter().copied());
        let z = z_function(&values);
        let mut rvalues = Vec::with_capacity(m + 1 + n);
        rvalues.extend(pattern.bytes().rev().map(|b| b as i32));
        rvalues.push(-1);
        rvalues.extend(codes.iter().rev().copied());
        let r = z_function(&rvalues);
        for i in 0..=n - m {
            let f = z[m + 1 + i].min(m);
            if f >= m || f + r[m + 1 + n - i - m].min(m) >= m - 1 {
                return i as i32;
            }
        }
        -1
    }
}

fn z_function(values: &[i32]) -> Vec<usize> {
    let m = values.len();
    let mut z = vec![0usize; m];
    z[0] = m;
    let (mut left, mut right) = (0usize, 0usize);
    for i in 1..m {
        if i < right {
            z[i] = (right - i).min(z[i - left]);
        }
        while i + z[i] < m && values[z[i]] == values[i + z[i]] {
            z[i] += 1;
        }
        if i + z[i] > right {
            left = i;
            right = i + z[i];
        }
    }
    z
}
