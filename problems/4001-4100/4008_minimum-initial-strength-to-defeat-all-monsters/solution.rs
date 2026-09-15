impl Solution {
    pub fn min_initial_strength(monsters: Vec<i32>, boosts: Vec<Vec<i32>>) -> i64 {
        let n = monsters.len();
        let mut delta = vec![0_i64; n + 1];
        for boost in &boosts {
            delta[boost[0] as usize] += boost[2] as i64;
            delta[boost[1] as usize + 1] -= boost[2] as i64;
        }

        let mut bonus = 0_i64;
        let mut prefix = 0_i64;
        let mut answer = 0_i64;
        for i in 0..n {
            bonus += delta[i];
            let needed = monsters[i] as i64 - bonus;
            if needed > 0 {
                answer = answer.max(prefix + needed);
            }
            prefix += monsters[i] as i64;
        }
        answer
    }
}
