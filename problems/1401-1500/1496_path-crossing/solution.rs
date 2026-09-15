use std::collections::HashSet;

impl Solution {
    pub fn is_path_crossing(path: String) -> bool {
        let (mut x, mut y) = (0i64, 0i64);
        let mut visited: HashSet<(i64, i64)> = HashSet::new();
        visited.insert((0, 0));
        for step in path.bytes() {
            match step {
                b'N' => y += 1,
                b'S' => y -= 1,
                b'E' => x += 1,
                _ => x -= 1,
            }
            if !visited.insert((x, y)) {
                return true;
            }
        }
        false
    }
}
