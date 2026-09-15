impl Solution {
    // Binary search the largest feasible side; area is side squared.
    pub fn max_area(mat: Vec<Vec<i32>>) -> i32 {
        let m = mat.len();
        let n = mat[0].len();
        // prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
        // is then four lookups, so "all ones" is an O(1) test.
        let mut prefix = vec![vec![0i32; n + 1]; m + 1];
        for i in 0..m {
            for j in 0..n {
                prefix[i + 1][j + 1] = prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j] + mat[i][j];
            }
        }
        let mut lo: usize = 0;
        let mut hi: usize = m.min(n);
        while lo < hi {
            let mid = (lo + hi + 1) / 2;
            if Self::has_disjoint_pair(&prefix, mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        (lo * lo) as i32
    }

    // A disjoint pair exists iff the valid corners span >= k rows or >= k
    // columns: extreme-row corners give disjoint row ranges, and if both
    // spans are < k every pair of squares intersects. The same corner twice
    // spans 0 < k, so it never counts as a pair.
    fn has_disjoint_pair(prefix: &Vec<Vec<i32>>, k: usize) -> bool {
        let m = prefix.len() - 1;
        let n = prefix[0].len() - 1;
        let mut found = false;
        let (mut min_row, mut min_col) = (usize::MAX, usize::MAX);
        let (mut max_row, mut max_col) = (0usize, 0usize);
        let kk = (k * k) as i32;
        for r in 0..=(m - k) {
            for c in 0..=(n - k) {
                // Four prefix lookups decide whether this square is all ones.
                if prefix[r + k][c + k] - prefix[r][c + k] - prefix[r + k][c] + prefix[r][c] == kk {
                    found = true;
                    min_row = min_row.min(r);
                    max_row = max_row.max(r);
                    min_col = min_col.min(c);
                    max_col = max_col.max(c);
                }
            }
        }
        if !found {
            return false;
        }
        max_row - min_row >= k || max_col - min_col >= k
    }
}
