impl Solution {
    pub fn can_complete_circuit(gas: Vec<i32>, cost: Vec<i32>) -> i32 {
        let mut total: i64 = 0;
        let mut tank: i64 = 0;
        let mut start: i32 = 0;
        for i in 0..gas.len() {
            let diff = gas[i] as i64 - cost[i] as i64;
            // total witnesses whether the whole circuit is feasible at all.
            total += diff;
            // tank is the running surplus measured from the candidate start.
            tank += diff;
            if tank < 0 {
                // Restarting anywhere in [start, i] forfeits a non-negative
                // surplus, so an intermediate start reaches i with even less
                // fuel: the whole stretch is disqualified in one stroke.
                start = i as i32 + 1;
                tank = 0;
            }
        }
        // total >= 0 certifies the final candidate can finish the circuit.
        if total >= 0 {
            start
        } else {
            -1
        }
    }
}
