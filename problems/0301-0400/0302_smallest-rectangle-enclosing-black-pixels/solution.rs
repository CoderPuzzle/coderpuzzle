impl Solution {
    pub fn min_area(image: Vec<Vec<String>>, x: i32, y: i32) -> i32 {
        // The region is connected, so its projection on each axis is one
        // contiguous range: every row between the topmost and bottommost
        // black row holds a black pixel, and likewise for columns. Each
        // "does this line hold a black pixel" predicate therefore flips
        // exactly once around the known black pixel (x, y).
        let has_black_row = |r: usize| image[r].iter().any(|cell| cell == "1");
        let has_black_col = |c: usize| image.iter().any(|row| row[c] == "1");
        let (x, y) = (x as usize, y as usize);
        // Each bound is a binary search outward from (x, y): the line through
        // (x, y) itself is black, so every window probed still brackets it.
        let top = first_black(0, x, &has_black_row);
        let bottom = last_black(x, image.len() - 1, &has_black_row);
        let left = first_black(0, y, &has_black_col);
        let right = last_black(y, image[0].len() - 1, &has_black_col);
        // The smallest enclosing rectangle is the cross of the two spans.
        ((bottom - top + 1) * (right - left + 1)) as i32
    }
}

// First line in [lo, hi] that is black; has(hi) always holds because the
// range brackets the line through (x, y) itself.
fn first_black(lo: usize, hi: usize, has: &dyn Fn(usize) -> bool) -> usize {
    let (mut lo, mut hi) = (lo, hi);
    while lo < hi {
        let mid = (lo + hi) / 2;
        if has(mid) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    lo
}

// Last line in [lo, hi] that is black; the +1 in the midpoint keeps the
// window shrinking when only two lines remain.
fn last_black(lo: usize, hi: usize, has: &dyn Fn(usize) -> bool) -> usize {
    let (mut lo, mut hi) = (lo, hi);
    while lo < hi {
        let mid = (lo + hi + 1) / 2;
        if has(mid) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    lo
}
