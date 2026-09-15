impl Solution {
    // depths[d] is the absolute-path length of the most recent entry seen at
    // depth d; a name at depth d extends the entry at depth d - 1.
    pub fn length_longest_path(input: String) -> i32 {
        let mut depths: Vec<i32> = vec![0];
        let mut longest = 0;
        for token in input.split('\n') {
            let name = token.trim_start_matches('\t');
            let depth = token.len() - name.len();
            // The path to this entry is its parent's path, one '/' separator,
            // then the name itself (the root level has no separator).
            let mut path = name.len() as i32;
            if depth > 0 {
                path += depths[depth - 1] + 1;
            }
            if depth < depths.len() {
                depths[depth] = path;
            } else {
                depths.push(path);
            }
            // Files are exactly the names that contain a dot.
            if name.contains('.') {
                longest = longest.max(path);
            }
        }
        longest
    }
}
