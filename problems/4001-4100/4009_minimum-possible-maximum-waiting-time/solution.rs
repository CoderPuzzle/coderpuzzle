use std::collections::HashMap;

impl Solution {
    pub fn min_max_waiting_time(demand: Vec<i32>, fuel: Vec<i32>) -> i32 {
        // Level sweep over cars. A state packs (fuel0, fuel1, busy0, busy1)
        // -- remaining fuel and remaining busy time per dispenser, measured
        // from when the current car becomes allowed -- in base 51, mapped
        // to the smallest maximum waiting time achievable so far.
        const B: i32 = 51;
        let mut states: HashMap<i32, i32> = HashMap::new();
        states.insert(((fuel[0] * B + fuel[1]) * B) * B, 0);
        for i in 0..demand.len() {
            let d = demand[i];
            let mut nxt: HashMap<i32, i32> = HashMap::new();
            for (&key, &worst) in &states {
                let f0 = key / (B * B * B);
                let f1 = (key / (B * B)) % B;
                let r0 = (key / B) % B;
                let r1 = key % B;
                if f0 >= d {
                    // Serve car i on dispenser 0; the other dispenser's
                    // clock runs down by r0 while it waits.
                    let nmw = worst.max(r0);
                    let nk = (((f0 - d) * B + f1) * B + d) * B + (r1 - r0).max(0);
                    nxt.entry(nk)
                        .and_modify(|v| {
                            if nmw < *v {
                                *v = nmw;
                            }
                        })
                        .or_insert(nmw);
                }
                if f1 >= d {
                    let nmw = worst.max(r1);
                    let nk = ((f0 * B + (f1 - d)) * B + (r0 - r1).max(0)) * B + d;
                    nxt.entry(nk)
                        .and_modify(|v| {
                            if nmw < *v {
                                *v = nmw;
                            }
                        })
                        .or_insert(nmw);
                }
            }
            if nxt.is_empty() {
                // The process terminates here and no car may be skipped,
                // so every live state has served exactly i cars.
                return if i == 0 { -1 } else { *states.values().min().unwrap() };
            }
            states = nxt;
        }
        *states.values().min().unwrap()
    }
}
