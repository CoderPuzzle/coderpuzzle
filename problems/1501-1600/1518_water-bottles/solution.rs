impl Solution {
    pub fn num_water_bottles(numBottles: i32, numExchange: i32) -> i32 {
        // Every bottle is drunk exactly once, whether it started full or
        // was obtained by trading in empties. Track how many empties are
        // on hand and repeatedly trade in as many full groups as
        // possible.
        let mut drunk = numBottles;
        let mut empty = numBottles;
        while empty >= numExchange {
            let new_full = empty / numExchange;
            empty = empty % numExchange + new_full;
            drunk += new_full;
        }
        drunk
    }
}
