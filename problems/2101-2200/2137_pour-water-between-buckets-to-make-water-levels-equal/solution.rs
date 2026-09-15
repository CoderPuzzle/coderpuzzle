impl Solution {
    pub fn equalize_water(buckets: Vec<i32>, loss: i32) -> f64 {
        let mut low = 0.0_f64;
        let mut high = f64::from(*buckets.iter().max().unwrap());
        let retained = f64::from(100 - loss) / 100.0;
        for _ in 0..100 {
            let middle = (low + high) / 2.0;
            let mut needed = 0.0;
            let mut available = 0.0;
            for &water in &buckets {
                let water = f64::from(water);
                if water < middle {
                    needed += middle - water;
                } else {
                    available += water - middle;
                }
            }
            if available * retained >= needed {
                low = middle;
            } else {
                high = middle;
            }
        }
        low
    }
}
