impl Solution {
    pub fn stone_game_ix(stones: Vec<i32>) -> bool {
        let mut counts = [0i32; 3];
        for stone in stones {
            counts[(stone % 3) as usize] += 1;
        }

        if counts[0] % 2 == 0 {
            return counts[1] > 0 && counts[2] > 0;
        }
        (counts[1] - counts[2]).abs() > 2
    }
}
