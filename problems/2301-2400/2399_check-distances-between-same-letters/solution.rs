impl Solution {
    // Remember each letter's first index; on the second sighting the
    // letters strictly between number second - first - 1, which must
    // equal that letter's distance entry.
    pub fn check_distances(s: String, distance: Vec<i32>) -> bool {
        let mut first = [None::<usize>; 26];
        for (i, c) in s.chars().enumerate() {
            let k = c as usize - 'a' as usize;
            match first[k] {
                None => first[k] = Some(i),
                Some(j) => {
                    if i - j - 1 != distance[k] as usize {
                        return false;
                    }
                }
            }
        }
        true
    }
}
