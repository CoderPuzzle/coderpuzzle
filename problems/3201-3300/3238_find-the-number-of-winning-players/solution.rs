impl Solution {
    pub fn winning_player_count(n: i32, pick: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut counts = vec![[0i32; 11]; n];
        for p in &pick {
            counts[p[0] as usize][p[1] as usize] += 1;
        }

        let mut winners = 0;
        for player in 0..n {
            let best = *counts[player].iter().max().unwrap();
            if best > player as i32 {
                winners += 1;
            }
        }
        winners
    }
}
