// Maximum bipartite matching: each boy in turn looks for a girl, and when
// his only choices are taken, an augmenting path asks an earlier boy to
// reroute — the matched count grows by one exactly when such a path exists.
impl Solution {
    pub fn maximum_invitations(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid[0].len();
        // girl j is invited by boy invitations[j] (-1 while unmatched)
        let mut invitations = vec![-1i32; n];

        fn invite(grid: &[Vec<i32>], invitations: &mut [i32], boy: i32, seen: &mut [bool]) -> bool {
            let boy = boy as usize;
            let n = grid[0].len();
            for girl in 0..n {
                if grid[boy][girl] == 1 && !seen[girl] {
                    seen[girl] = true;
                    if invitations[girl] == -1 || invite(grid, invitations, invitations[girl], seen) {
                        invitations[girl] = boy as i32;
                        return true;
                    }
                }
            }
            false
        }

        let mut accepted = 0;
        for boy in 0..grid.len() {
            if invite(&grid, &mut invitations, boy as i32, &mut vec![false; n]) {
                accepted += 1;
            }
        }
        accepted
    }
}
