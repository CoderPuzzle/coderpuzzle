impl Solution {
    pub fn count_complete_day_pairs(hours: Vec<i32>) -> i32 {
        // With n <= 100 there are at most 4950 pairs, so hint 1's straight
        // double scan is exactly right at this scale. Two raw values can
        // reach 2 * 10^9 and wrap an i32, so pair residues instead; the
        // residue total never exceeds 46.
        let residues: Vec<i32> = hours.iter().map(|&value| value % 24).collect();
        let mut count = 0;
        for i in 0..hours.len() {
            for j in i + 1..hours.len() {
                if (residues[i] + residues[j]) % 24 == 0 {
                    count += 1;
                }
            }
        }
        count
    }
}
