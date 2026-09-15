impl Solution {
    // Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
    // the peak sits inside or on the slopes. Sorting by x ascending (ties
    // by y descending) puts every potential coverer no later, so a
    // monotonic stack settles everything in one pass. Duplicated peaks are
    // invisible but still hide others, so they stay on the stack for their
    // covering effect and are only excluded from the final count.
    pub fn visible_mountains(mut peaks: Vec<Vec<i32>>) -> i32 {
        peaks.sort_by(|p, q| if p[0] != q[0] { p[0].cmp(&q[0]) } else { q[1].cmp(&p[1]) });
        let mut stack: Vec<(i32, i32, bool)> = Vec::new(); // (x, y, counted)
        let mut i = 0;
        while i < peaks.len() {
            let mut j = i; // run-length encode equal peaks to detect duplicates
            while j < peaks.len() && peaks[j][0] == peaks[i][0] && peaks[j][1] == peaks[i][1] {
                j += 1;
            }
            let duplicated = j - i > 1;
            let x = peaks[i][0];
            let y = peaks[i][1];
            while let Some(&(tx, ty, _)) = stack.last() {
                if (tx - x).abs() <= y - ty {
                    stack.pop();
                } else {
                    break;
                }
            }
            let covered = match stack.last() {
                Some(&(tx, ty, _)) => (x - tx).abs() <= ty - y,
                None => false,
            };
            if !covered {
                stack.push((x, y, !duplicated));
            }
            i = j;
        }
        stack.iter().filter(|&&(_, _, counted)| counted).count() as i32
    }
}
