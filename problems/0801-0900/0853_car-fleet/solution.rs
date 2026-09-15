impl Solution {
    pub fn car_fleet(target: i32, position: Vec<i32>, speed: Vec<i32>) -> i32 {
        // Cars cannot pass each other, so sweep from the car nearest
        // the target backward.
        let mut cars: Vec<(i32, i32)> = position.into_iter().zip(speed).collect();
        cars.sort_by(|a, b| b.0.cmp(&a.0).then(b.1.cmp(&a.1)));
        let mut fleets = 0;
        let mut last_time = 0.0f64;
        for &(pos, spd) in &cars {
            // A car's fate is its alone-time to the target.
            let time = (target - pos) as f64 / spd as f64;
            // Strictly later never catches the fleet ahead: a new
            // fleet lead. Otherwise it merges (equality at the target
            // merges), and last_time — the current fleet's arrival
            // time — stays put.
            if time > last_time {
                fleets += 1;
                last_time = time;
            }
        }
        fleets
    }
}
