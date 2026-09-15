impl Solution {
    pub fn find_winning_player(skills: Vec<i32>, k: i32) -> i32 {
        // Challengers arrive in index order exactly as in the queue, so
        // one king-of-the-hill pass reproduces every game until someone
        // hits k wins. If no one does by then the champion holds the
        // global top skill and can never lose again.
        let mut idx = 0_usize;
        let mut wins = 0_i32;
        for i in 1..skills.len() {
            if skills[i] > skills[idx] {
                idx = i;
                wins = 1;
            } else {
                wins += 1;
            }
            if wins == k {
                return idx as i32;
            }
        }
        idx as i32
    }
}
