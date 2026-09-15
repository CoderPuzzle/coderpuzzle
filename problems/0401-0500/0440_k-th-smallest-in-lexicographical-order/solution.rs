impl Solution {
    pub fn find_kth_number(n: i32, k: i32) -> i32 {
        let n = n as i64;
        // Lexicographic order = preorder walk of the denary tree (children
        // append digits 0-9); kk becomes a zero-based count of nodes to skip.
        let mut cur: i64 = 1;
        let mut kk: i64 = k as i64 - 1;
        while kk > 0 {
            let steps = count_steps(n, cur, cur + 1);
            // Whole subtree between cur and cur+1 fits the budget: skip it
            // and move to the next sibling; otherwise descend past cur.
            if steps <= kk {
                cur += 1;
                kk -= steps;
            } else {
                cur *= 10;
                kk -= 1;
            }
        }
        cur as i32
    }
}

// Size of the subtree rooted at prefix n1: numbers in [1, n] lying in
// [n1, n2). One level at a time, [n1, n2) covers every number sharing the
// prefix at that depth, so clamp the right edge past n and scale both
// bounds by ten for the next level.
fn count_steps(n: i64, mut n1: i64, mut n2: i64) -> i64 {
    let mut steps: i64 = 0;
    while n1 <= n {
        steps += (n + 1).min(n2) - n1;
        n1 *= 10;
        n2 *= 10;
    }
    steps
}
