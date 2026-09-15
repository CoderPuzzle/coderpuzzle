impl Solution {
    // Costs and capacities are at most 1e5 and budget at most 2e5, so
    // every cost sum stays below budget and every capacity sum is at most
    // 2e5 — i32 carries them all. Sort the machines by cost with
    // capacities aligned; every affordable pair is then reachable from
    // its dearer machine with a prefix of cheaper partners, so a prefix
    // maximum of capacities answers "best partner" in constant time per
    // machine.
    pub fn max_capacity(costs: Vec<i32>, capacity: Vec<i32>, budget: i32) -> i32 {
        let mut machines: Vec<(i32, i32)> = costs.iter().zip(capacity.iter()).map(|(&c, &p)| (c, p)).collect();
        machines.sort_unstable();
        let n = machines.len();
        let sorted_costs: Vec<i32> = machines.iter().map(|&(c, _)| c).collect();
        let mut pref_max: Vec<i32> = vec![0; n];
        let mut run = 0;
        for (t, &(_, cap)) in machines.iter().enumerate() {
            run = run.max(cap);
            pref_max[t] = run;
        }
        // The empty selection costs 0 < budget (budget >= 1), so 0 is
        // always achievable and the answer only improves from there.
        // Partners are read only from indices before i, so a machine can
        // never pair with itself while every pair is still counted from
        // its dearer end.
        let mut ans = 0;
        for i in 0..n {
            let (cost, cap) = machines[i];
            if cost < budget {
                ans = ans.max(cap);
            }
            // Largest j with sorted_costs[j] < budget - cost.
            let j = sorted_costs.partition_point(|&x| x < budget - cost) as isize - 1;
            let t = j.min(i as isize - 1);
            if t >= 0 {
                ans = ans.max(cap + pref_max[t as usize]);
            }
        }
        ans
    }
}
