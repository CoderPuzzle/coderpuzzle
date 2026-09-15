impl Solution {
    pub fn minimize_error(prices: Vec<String>, target: i32) -> String {
        // Work entirely in integer thousandths so nothing ever touches a
        // float: "1.500" splits into an integer part (the floor) and a
        // 3-digit fractional part (in [0, 1000)).
        let mut sum_floors: i64 = 0;
        let mut fracs: Vec<i64> = Vec::new();
        for price in &prices {
            let dot = price.find('.').unwrap();
            let floor_val: i64 = price[..dot].parse().unwrap();
            let frac_val: i64 = price[dot + 1..].parse().unwrap();
            sum_floors += floor_val;
            if frac_val != 0 {
                fracs.push(frac_val);
            }
        }

        let count_nonint = fracs.len() as i64;
        let sum_ceils = sum_floors + count_nonint;
        let target = target as i64;
        if target < sum_floors || target > sum_ceils {
            return "-1".to_string();
        }

        // Flooring everything reaches sum_floors; each fractional price
        // switched to its ceiling adds exactly 1, so exactly k of them
        // must switch.
        let k = (target - sum_floors) as usize;

        // Switching a price with fractional part f changes its error
        // contribution from f to (1000 - f): cheapest for the largest f.
        // Flip the k largest fractions first.
        let base_error: i64 = fracs.iter().sum();
        fracs.sort_unstable_by(|a, b| b.cmp(a));
        let sum_flip: i64 = fracs[..k].iter().sum();
        let total_error = base_error + k as i64 * 1000 - 2 * sum_flip;

        format!("{}.{:03}", total_error / 1000, total_error % 1000)
    }
}
