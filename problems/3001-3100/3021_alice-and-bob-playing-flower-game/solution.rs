impl Solution {
    pub fn flower_game(n: i32, m: i32) -> i64 {
        // Each turn removes exactly one flower, so a game started with
        // x + y flowers always lasts exactly x + y turns, and the mover of
        // that final turn empties the field and captures the opponent.
        // Alice moves on odd-numbered turns, so she wins exactly when
        // x + y is odd. Counting odd-sum pairs: odd x against even y plus
        // even x against odd y, where [1, k] holds ceil(k / 2) odds and
        // floor(k / 2) evens. Widen to i64 before multiplying: the answer
        // reaches 5e9 at the bounds, past what an i32 can hold.
        let odd_n = ((n + 1) / 2) as i64;
        let even_n = (n / 2) as i64;
        let odd_m = ((m + 1) / 2) as i64;
        let even_m = (m / 2) as i64;
        odd_n * even_m + even_n * odd_m
    }
}
