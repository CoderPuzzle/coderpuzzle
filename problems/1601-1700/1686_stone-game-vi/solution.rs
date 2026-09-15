impl Solution {
    pub fn stone_game_vi(alice_values: Vec<i32>, bob_values: Vec<i32>) -> i32 {
        let n = alice_values.len();
        // Taking a stone gains your value AND denies the opponent theirs, so
        // both players effectively compete for aliceValues[i] + bobValues[i].
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&i, &j| (alice_values[j] + bob_values[j]).cmp(&(alice_values[i] + bob_values[i])));
        let mut diff: i64 = 0;
        for (rank, &i) in order.iter().enumerate() {
            if rank % 2 == 0 {
                diff += alice_values[i] as i64; // Alice picks ranks 0, 2, 4, ...
            } else {
                diff -= bob_values[i] as i64; // Bob picks ranks 1, 3, 5, ...
            }
        }
        match diff {
            d if d > 0 => 1,
            d if d < 0 => -1,
            _ => 0,
        }
    }
}
