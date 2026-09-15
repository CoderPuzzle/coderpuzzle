impl Solution {
    pub fn video_stitching(clips: Vec<Vec<i32>>, time: i32) -> i32 {
        // Jump-game greedy over clips sorted by start.
        let mut ordered = clips.clone();
        ordered.sort();
        let mut count = 0;
        let mut covered = 0;
        let mut farthest = 0;
        let mut i = 0usize;
        let n = ordered.len();
        while covered < time {
            // Cursor i never resets: every clip starting at or before `covered`
            // is examined once, tracking the farthest reach it enables.
            while i < n && ordered[i][0] <= covered {
                if ordered[i][1] > farthest {
                    farthest = ordered[i][1];
                }
                i += 1;
            }
            // No usable clip reaches past the current coverage: an unbridgeable gap.
            if farthest == covered {
                return -1;
            }
            // Take one clip — the farthest-reaching — and jump the frontier.
            covered = farthest;
            count += 1;
        }
        count
    }
}
