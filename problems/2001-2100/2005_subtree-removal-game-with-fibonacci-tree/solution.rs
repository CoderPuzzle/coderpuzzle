impl Solution {
    pub fn find_game_winner(n: i32) -> bool {
        let mut two_back = 0;
        let mut one_back = 0;
        let mut child_xor = 0;

        for _ in 0..n {
            child_xor = two_back ^ one_back;
            let current = 1 + child_xor;
            two_back = one_back;
            one_back = current;
        }

        child_xor != 0
    }
}
