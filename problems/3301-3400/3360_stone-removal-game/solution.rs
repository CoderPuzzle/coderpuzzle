impl Solution {
    // Simulate the forced play: removal sizes drop 10, 9, 8, ... and
    // whoever faces a pile smaller than their removal size loses.
    pub fn can_alice_win(n: i32) -> bool {
        let mut n = n;
        let mut alice_to_move = true;
        let mut take = 10;
        while n >= take {
            n -= take;
            take -= 1;
            alice_to_move = !alice_to_move;
        }
        !alice_to_move
    }
}
