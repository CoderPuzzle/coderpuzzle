impl Solution {
    pub fn num_rescue_boats(people: Vec<i32>, limit: i32) -> i32 {
        let mut sorted = people;
        sorted.sort_unstable();
        let mut i = 0usize;
        let mut j = sorted.len() as isize - 1;
        let mut boats = 0;
        while i as isize <= j {
            // The heaviest boards either way; the lightest is their best
            // partner, since a heavier one only risks exceeding the limit.
            // The i < j guard keeps the last person from pairing with themself.
            if (i as isize) < j && sorted[i] + sorted[j as usize] <= limit {
                i += 1;
            }
            j -= 1;
            boats += 1;
        }
        boats
    }
}
