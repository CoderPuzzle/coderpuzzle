impl Solution {
    pub fn generate_valid_strings(n: i32, k: i32) -> Vec<String> {
        // Left-to-right backtracking. At index i a '0' is always allowed; a
        // '1' is allowed only when it does not follow another '1' and its
        // index i keeps the running cost <= k. Trying '0' before '1' emits
        // every valid string in lexicographic order. Recursion depth <= 12.
        fn build(
            out: &mut Vec<String>,
            current: &mut Vec<u8>,
            n: usize,
            k: i32,
            index: usize,
            prev_one: bool,
            cost: i32,
        ) {
            if index == n {
                out.push(String::from_utf8_lossy(current).into_owned());
                return;
            }
            build(out, current, n, k, index + 1, false, cost);
            if !prev_one && cost + index as i32 <= k {
                current[index] = b'1';
                build(out, current, n, k, index + 1, true, cost + index as i32);
                current[index] = b'0';
            }
        }
        let mut out: Vec<String> = Vec::new();
        let mut current = vec![b'0'; n as usize];
        build(&mut out, &mut current, n as usize, k, 0, false, 0);
        out
    }
}
