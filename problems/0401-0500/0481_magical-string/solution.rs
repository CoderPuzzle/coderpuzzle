impl Solution {
    pub fn magical_string(n: i32) -> i32 {
        // The string is its own run-length encoding: grouping it into
        // runs of equal characters yields lengths that spell the string
        // again ("1 22 11 2 ..." → lengths "1 2 2 1 ..."). Seed the
        // prefix 1, 2, 2; a read pointer walks that prefix as the count
        // sequence while a write pointer appends s[read] copies of the
        // flip character, which alternates between 1 and 2 from group to
        // group. Generate until n elements exist, then count the 1s in
        // the first n.
        let n = n as usize;
        let mut s = vec![0; n.max(3)];
        s[0] = 1;
        s[1] = 2;
        s[2] = 2;
        let mut write = 3;
        let mut read = 2;
        let mut flip = 1;
        while write < n {
            let count = s[read];
            read += 1;
            let mut i = 0;
            while i < count && write < n {
                s[write] = flip;
                write += 1;
                i += 1;
            }
            flip = 3 - flip;
        }
        let mut ones = 0;
        for i in 0..n {
            if s[i] == 1 {
                ones += 1;
            }
        }
        ones
    }
}
