impl Solution {
    pub fn findPattern(stream: &mut InfiniteStream, pattern: Vec<i32>) -> i32 {
        let length = pattern.len();
        // Circular buffer of the last `length` bits: the newest bit
        // overwrites the oldest, and a full window is compared with the
        // pattern.
        let mut window = vec![0; length];
        let mut head = 0;
        let mut read: i64 = 0;
        loop {
            window[head] = stream.next();
            head = (head + 1) % length;
            read += 1;
            if read >= length as i64 {
                let mut matches = true;
                for i in 0..length {
                    if window[(head + i) % length] != pattern[i] {
                        matches = false;
                        break;
                    }
                }
                if matches {
                    return (read - length as i64) as i32;
                }
            }
        }
    }
}
