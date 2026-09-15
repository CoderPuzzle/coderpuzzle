impl Solution {
    pub fn circular_game_losers(n: i32, k: i32) -> Vec<i32> {
        // Straight simulation: friend 1 holds the ball at the start, and each
        // turn i moves the holder i*k seats clockwise. At most n turns pass
        // before some friend receives the ball twice; i*k <= 2500 so i32
        // arithmetic never overflows.
        let n = n as usize;
        let k = k as usize;
        let mut received = vec![false; n];
        received[0] = true;
        let mut holder = 0;
        let mut turn = 1;
        loop {
            holder = (holder + turn * k) % n;
            if received[holder] {
                break;
            }
            received[holder] = true;
            turn += 1;
        }
        (0..n)
            .filter(|&friend| !received[friend])
            .map(|friend| (friend + 1) as i32)
            .collect()
    }
}
