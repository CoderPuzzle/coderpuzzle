impl Solution {
    pub fn min_damage(power: i32, damage: Vec<i32>, health: Vec<i32>) -> i64 {
        let n = damage.len();
        let mut times = vec![0i64; n];
        let mut ratio = vec![0.0f64; n];
        let mut remaining: i64 = 0;
        for i in 0..n {
            // Enemy i needs ceil(health/power) seconds of focused attack to die.
            times[i] = ((health[i] as i64) + (power as i64) - 1) / (power as i64);
            ratio[i] = damage[i] as f64 / times[i] as f64;
            remaining += damage[i] as i64;
        }
        // Exchange argument on adjacent kills a, b: only damage_a * t_b versus
        // damage_b * t_a differs between the two orders, so descending
        // damage/time ratio order is globally optimal.
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| ratio[b].partial_cmp(&ratio[a]).unwrap_or(std::cmp::Ordering::Equal));
        let mut answer: i64 = 0;
        for i in order {
            // While enemy i spends times[i] seconds dying, every enemy still
            // alive (i included) keeps dealing its damage each second.
            answer += remaining * times[i];
            remaining -= damage[i] as i64;
        }
        answer
    }
}
