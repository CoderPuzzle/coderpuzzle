impl Solution {
    pub fn moves_to_stamp(stamp: String, target: String) -> Vec<i32> {
        // Work backwards from target, where stamping forwards becomes erasing:
        // a window is erasable once every character in it either equals its
        // stamp counterpart or is already '?', because the last stamp to
        // cover a position always leaves the stamp's own letter there. Each
        // round takes the leftmost erasable window that still contains a
        // letter — erasing it can never block the remaining windows, since
        // turning letters into '?' only widens what matches — and blanks it.
        // A round that finds nothing while letters remain proves the target
        // unreachable; reversing the recorded indices yields the stamping
        // order.
        let stamp = stamp.as_bytes();
        let m = stamp.len();
        let n = target.len();
        let mut s = target.into_bytes();
        let mut remaining = n;
        let mut recorded: Vec<i32> = Vec::new();
        while remaining > 0 {
            let mut found: Option<usize> = None;
            for i in 0..=(n - m) {
                let mut ok = true;
                let mut progress = false;
                for j in 0..m {
                    let c = s[i + j];
                    if c == b'?' {
                        continue;
                    }
                    if c != stamp[j] {
                        ok = false;
                        break;
                    }
                    progress = true;
                }
                if ok && progress {
                    found = Some(i);
                    break;
                }
            }
            let found = match found {
                Some(index) => index,
                None => return Vec::new(),
            };
            for j in 0..m {
                if s[found + j] != b'?' {
                    s[found + j] = b'?';
                    remaining -= 1;
                }
            }
            recorded.push(found as i32);
        }
        recorded.reverse();
        recorded
    }
}
