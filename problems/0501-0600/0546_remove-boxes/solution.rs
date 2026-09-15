// Memoized interval DP. dfs(l, r, k) is the best score from boxes[l..r]
// when k boxes of boxes[l]'s color, already removed from outside the
// interval, sit glued to its left and will join its group.
impl Solution {
    pub fn remove_boxes(boxes: Vec<i32>) -> i32 {
        let n = boxes.len();
        let mut memo = vec![vec![vec![-1; n + 1]; n]; n];
        dfs(&boxes, &mut memo, 0, n - 1, 0)
    }
}

fn dfs(boxes: &[i32], memo: &mut Vec<Vec<Vec<i32>>>, l: usize, r: usize, k: usize) -> i32 {
    if l > r {
        return 0;
    }
    let (mut l, mut k) = (l, k);
    // Adjacent same-colored boxes never need separate treatment: holding
    // boxes[l] until its identical neighbor leaves only grows the eventual
    // group, so the run joins the carry.
    while l < r && boxes[l + 1] == boxes[l] {
        l += 1;
        k += 1;
    }
    if memo[l][r][k] != -1 {
        return memo[l][r][k];
    }
    // Either take boxes[l] and its carry now, scoring (k+1)^2...
    let mut best = (k as i32 + 1) * (k as i32 + 1) + dfs(boxes, memo, l + 1, r, 0);
    // ...or hold it: clear boxes[l+1..m-1] first, so boxes[l] meets the
    // next same-colored box one richer in the carry.
    for m in (l + 1)..=r {
        if boxes[m] == boxes[l] {
            best = best.max(dfs(boxes, memo, l + 1, m - 1, 0) + dfs(boxes, memo, m, r, k + 1));
        }
    }
    memo[l][r][k] = best;
    best
}
