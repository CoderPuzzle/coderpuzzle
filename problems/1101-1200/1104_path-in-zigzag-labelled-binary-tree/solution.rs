impl Solution {
    pub fn path_in_zig_zag_tree(label: i32) -> Vec<i32> {
        // Walk up level by level using each node's position within its row.
        // The parent of the node at position p sits at position p / 2 in the
        // row above, in every row; only the label-to-position mapping flips
        // direction between rows. Fill the result from the back so the path
        // comes out root-first without a separate reverse.
        let mut level = 0;
        let mut v = label;
        while v > 1 {
            v >>= 1;
            level += 1;
        }
        let mut result = vec![0; (level + 1) as usize];
        let mut cur = label;
        let mut i = level;
        loop {
            result[i as usize] = cur;
            if i == 0 {
                break;
            }
            let low = 1 << i;
            let high = (1 << (i + 1)) - 1;
            let position = if i % 2 == 0 { cur - low } else { high - cur };
            let parent_position = position / 2;
            let plow = 1 << (i - 1);
            let phigh = (1 << i) - 1;
            cur = if (i - 1) % 2 == 0 {
                plow + parent_position
            } else {
                phigh - parent_position
            };
            i -= 1;
        }
        result
    }
}
