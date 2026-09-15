impl Solution {
    pub fn min_deletions(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // eq[i] = 1 iff i >= 1 and s[i] == s[i - 1]. Deleting one character
        // per equal adjacent pair is optimal, so the type-2 answer over
        // s[l..r] is exactly sum(eq[l+1..r]). A Fenwick tree over eq answers
        // each query in O(log n), and flipping s[j] only ever changes eq[j]
        // and eq[j + 1], because every other adjacency is untouched.
        let n = s.len();
        let mut cur = vec![0_i32; n];
        let mut bits = vec![0_i32; n];
        let mut chars: Vec<u8> = s.bytes().collect();
        for i in 1..n {
            if chars[i] == chars[i - 1] {
                cur[i] = 1;
                let mut j = i;
                while j < n {
                    bits[j] += 1;
                    j += j & j.wrapping_neg();
                }
            }
        }
        let mut answer = Vec::with_capacity(queries.len());
        for query in &queries {
            if query[0] == 1 {
                let j = query[1] as usize;
                chars[j] = if chars[j] == b'A' { b'B' } else { b'A' };
                if j + 1 < n {
                    let value = if chars[j + 1] == chars[j] { 1 } else { 0 };
                    set_eq(&mut cur, &mut bits, n, j + 1, value);
                }
                let value = if j >= 1 && chars[j] == chars[j - 1] { 1 } else { 0 };
                set_eq(&mut cur, &mut bits, n, j, value);
            } else {
                let (l, r) = (query[1] as usize, query[2] as usize);
                answer.push(pref(&bits, r) - pref(&bits, l));
            }
        }
        answer
    }
}

fn set_eq(cur: &mut [i32], bits: &mut [i32], n: usize, i: usize, value: i32) {
    if i >= 1 && i < n && cur[i] != value {
        let mut j = i;
        while j < n {
            bits[j] += value - cur[i];
            j += j & j.wrapping_neg();
        }
        cur[i] = value;
    }
}

fn pref(bits: &[i32], mut i: usize) -> i32 {
    let mut total = 0;
    while i > 0 {
        total += bits[i];
        i -= i & i.wrapping_neg();
    }
    total
}
