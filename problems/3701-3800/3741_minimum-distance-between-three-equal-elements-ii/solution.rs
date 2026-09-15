impl Solution {
    pub fn minimum_distance(nums: Vec<i32>) -> i32 {
        // The three pairwise gaps of a good tuple telescope to twice the
        // span between its outermost indices, so the closest tuple is the
        // one whose outermost same-value indices are nearest. Every value
        // gets its own bucket of indices, filled in one left-to-right pass
        // so each bucket comes out sorted for free.
        let n = nums.len();
        let mut groups: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for (index, &num) in nums.iter().enumerate() {
            groups[num as usize].push(index);
        }
        // Inside a sorted bucket no triple beats some consecutive window:
        // the two entries immediately following any entry sit no later than
        // the other two entries of any triple opened there, so their window
        // spans no more.
        let mut best: isize = -1;
        for indices in &groups {
            for start in 0..indices.len().saturating_sub(2) {
                let span = (indices[start + 2] - indices[start]) as isize;
                if best == -1 || span < best {
                    best = span;
                }
            }
        }
        // The best span stays unset unless some value occurs at least three
        // times; otherwise no good tuple exists.
        if best == -1 {
            -1
        } else {
            2 * best as i32
        }
    }
}
