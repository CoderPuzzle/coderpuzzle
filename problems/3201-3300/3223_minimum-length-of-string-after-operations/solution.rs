impl Solution {
    // Each operation deletes two copies of one letter — the closest
    // same-letter occurrences on either side of a pivot — so every
    // letter's count keeps its parity while pairs keep coming off.
    pub fn minimum_length(s: String) -> i32 {
        let mut counts = [0i32; 26];
        for b in s.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        // A letter with three or more copies always has a usable pivot,
        // so it reduces to one copy when odd and two when even; letters
        // below three are already stuck there.
        let mut total = 0;
        for &count in counts.iter() {
            if count == 0 {
                continue;
            }
            total += if count % 2 == 1 { 1 } else { 2 };
        }
        total
    }
}
