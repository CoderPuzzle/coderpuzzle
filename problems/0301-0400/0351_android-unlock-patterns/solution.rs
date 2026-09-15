impl Solution {
    pub fn number_of_patterns(m: i32, n: i32) -> i32 {
        // skip[a][b]: the dot whose center the segment a-b passes straight
        // through (0 when it passes through none) — the eight pairs whose
        // endpoints lie on one row, column, or diagonal with a dot between.
        let mut skip = [[0i32; 10]; 10];
        for (a, b, middle) in [
            (1usize, 3, 2),
            (1, 7, 4),
            (3, 9, 6),
            (7, 9, 8),
            (1, 9, 5),
            (3, 7, 5),
            (2, 8, 5),
            (4, 6, 5),
        ] {
            skip[a][b] = middle;
            skip[b][a] = middle;
        }
        // Rotations and reflections of the grid preserve every blocking
        // relation while permuting corners among themselves and edge
        // midpoints among themselves, so three searches (corner 1, edge 2,
        // center 5) cover all nine starting dots.
        4 * walk(1 | 1 << 1, 1, 1, m, n, &skip)
            + 4 * walk(1 | 1 << 2, 2, 1, m, n, &skip)
            + walk(1 | 1 << 5, 5, 1, m, n, &skip)
    }
}

// The prefix built so far already counts as one pattern once it holds m
// dots; it can keep growing only while under n.
fn walk(used: i32, last: usize, length: i32, m: i32, n: i32, skip: &[[i32; 10]; 10]) -> i32 {
    let mut total = if length >= m { 1 } else { 0 };
    if length == n {
        return total;
    }
    for next in 1..=9 {
        // `used` always has bit 0 set: a phantom dot standing for "no dot
        // in between", so skip 0 passes the same already-visited check as
        // every real blocking dot.
        let middle = skip[last][next] as usize;
        if used >> next & 1 == 0 && used >> middle & 1 == 1 {
            total += walk(used | 1 << next, next, length + 1, m, n, skip);
        }
    }
    total
}
