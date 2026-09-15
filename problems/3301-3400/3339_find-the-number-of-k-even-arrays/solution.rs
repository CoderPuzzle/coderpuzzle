// (arr[i] * arr[i+1]) - arr[i] - arr[i+1] = (arr[i]-1) * (arr[i+1]-1) - 1,
// which is even exactly when BOTH neighbors are even — so k-even means
// exactly k adjacent pairs have both elements even. With E = m/2 (floor)
// even values and O = m - E odd values, track per length i, for each pair
// count j, how many arrays end in an even value and how many end in an
// odd one. Extending by an even value (E choices) lifts an even-ending
// j-1-pair state to j pairs and leaves odd-ending states in place;
// extending by an odd value (O choices) never changes the count. Entries
// stay below MOD, so every join multiplies a value below 2 * MOD by at
// most 500 — about 10^12, kept in i64.
impl Solution {
    pub fn count_of_arrays(n: i32, m: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as usize;
        let even = (m / 2) as i64;
        let odd = (m - m / 2) as i64;
        let mut end_even = vec![0i64; n];
        let mut end_odd = vec![0i64; n];
        end_even[0] = even;
        end_odd[0] = odd;
        for _length in 1..n {
            let mut next_even = vec![0i64; n];
            let mut next_odd = vec![0i64; n];
            for j in 0..n {
                let prev = if j > 0 { end_even[j - 1] } else { 0 };
                next_even[j] = (prev + end_odd[j]) * even % MOD;
                next_odd[j] = (end_even[j] + end_odd[j]) * odd % MOD;
            }
            end_even = next_even;
            end_odd = next_odd;
        }
        ((end_even[k] + end_odd[k]) % MOD) as i32
    }
}
