impl Solution {
    pub fn find_the_winner(n: i32, k: i32) -> i32 {
        let n = n as usize;
        let k = k as usize;
        let mut friends: Vec<usize> = (1..=n).collect();
        // idx marks where the next count starts (friend 1 for the first round).
        let mut idx = 0usize;
        while friends.len() > 1 {
            // -1: the starting friend is counted too; % wraps the circle (k may exceed its size).
            idx = (idx + k - 1) % friends.len();
            // The clockwise neighbor shifts into the vacated slot, so idx already
            // points at where the next count must begin — no extra adjustment needed.
            friends.remove(idx);
        }
        friends[0] as i32
    }
}
