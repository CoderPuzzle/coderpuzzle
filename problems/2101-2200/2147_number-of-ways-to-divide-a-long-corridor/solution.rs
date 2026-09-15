impl Solution {
    pub fn number_of_ways(corridor: String) -> i32 {
        // Sections pair the seats up in order, so exactly one divider is
        // forced between each finished pair and the next seat — placeable
        // at any of the plants-plus-one positions inside that gap.
        const MOD: i64 = 1_000_000_007;
        let mut ways: i64 = 1;
        let mut seats = 0;
        let mut plants = 0;
        for &c in corridor.as_bytes() {
            if c == b'S' {
                seats += 1;
                if seats > 2 && seats % 2 == 1 {
                    ways = ways * (plants + 1) % MOD;
                }
                plants = 0;
            } else if seats >= 2 {
                plants += 1;
            }
        }
        if seats > 0 && seats % 2 == 0 {
            ways as i32
        } else {
            0
        }
    }
}
