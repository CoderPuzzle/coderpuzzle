impl Solution {
    pub fn max_bottles_drunk(num_bottles: i32, mut num_exchange: i32) -> i32 {
        // Every bottle drunk becomes an empty and exchange prices only rise,
        // so no optimal schedule ever gains by holding stock back: drink
        // everything in hand, then spend empties on one bottle per price
        // tier from cheapest upward while any tier is still affordable.
        let mut num_bottles = num_bottles;
        let mut drunk = 0;
        let mut empty = 0;
        while num_bottles > 0 {
            // Drink all held bottles; they may fund further exchanges.
            drunk += num_bottles;
            empty += num_bottles;
            num_bottles = 0;
            if empty >= num_exchange {
                // Pay exactly the current tier; the next batch costs more.
                empty -= num_exchange;
                num_exchange += 1;
                num_bottles = 1;
            }
        }
        drunk
    }
}
