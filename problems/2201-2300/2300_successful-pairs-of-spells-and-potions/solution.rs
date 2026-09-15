impl Solution {
    pub fn successful_pairs(spells: Vec<i32>, potions: Vec<i32>, success: i64) -> Vec<i32> {
        // a pair works iff spell * potion >= success, i.e. potion >= need;
        // successful potions are exactly the strongest suffix of the sorted array
        let mut potions = potions;
        potions.sort_unstable();
        let m = potions.len();
        spells
            .iter()
            .map(|&sp| {
                // ceil(success / sp) in integer arithmetic: exact even at 1e10
                let need = (success + sp as i64 - 1) / sp as i64;
                // partition_point: first index whose potion is NOT below need
                let idx = potions.partition_point(|&x| (x as i64) < need);
                // every potion from idx on is >= need: that suffix all succeeds
                (m - idx) as i32
            })
            .collect()
    }
}
