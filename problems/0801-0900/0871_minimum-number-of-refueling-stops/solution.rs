impl Solution {
    pub fn min_refuel_stops(target: i32, startFuel: i32, stations: Vec<Vec<i32>>) -> i32 {
        let mut fuel = startFuel as i64;
        let mut available: std::collections::BinaryHeap<i64> = std::collections::BinaryHeap::new();
        let mut stops = 0;
        let mut i = 0usize;
        let n = stations.len();
        loop {
            if fuel >= target as i64 {
                return stops;
            }
            while i < n && (stations[i][0] as i64) <= fuel {
                available.push(stations[i][1] as i64);
                i += 1;
            }
            match available.pop() {
                None => return -1,
                Some(f) => {
                    fuel += f;
                    stops += 1;
                }
            }
        }
    }
}
