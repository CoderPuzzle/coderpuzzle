impl Solution {
    pub fn get_index(reader: &mut ArrayReader) -> i32 {
        // Divide and conquer: compare two equal-length halves of the
        // current range and recurse into whichever sums higher — the
        // large entry inflates exactly one side. An odd-length range
        // peels off its middle element first; a tied comparison of the
        // remaining equal-length halves means that peeled element is the
        // large one.
        fn solve(reader: &mut ArrayReader, l: i32, r: i32) -> i32 {
            if l == r {
                return l;
            }
            let length = r - l + 1;
            let mid = (l + r) / 2;
            if length % 2 == 0 {
                let cmp = reader.compare_sub(l, mid, mid + 1, r);
                return if cmp > 0 {
                    solve(reader, l, mid)
                } else {
                    solve(reader, mid + 1, r)
                };
            }
            let cmp = reader.compare_sub(l, mid - 1, mid + 1, r);
            if cmp == 0 {
                return mid;
            }
            if cmp > 0 {
                solve(reader, l, mid - 1)
            } else {
                solve(reader, mid + 1, r)
            }
        }

        let length = reader.length();
        solve(reader, 0, length - 1)
    }
}
