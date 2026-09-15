impl Solution {
    // Only the letter counts matter; a good string has every count at
    // 0 or at some common target c, and c never needs to exceed the
    // largest count. For a fixed c each letter either keeps c copies
    // (cost |occ-c|) or is deleted out (cost occ). One refinement: a
    // unit in the letter just left of a kept letter that still needs
    // copies can change into it instead — the hop replaces the delete
    // the unit would pay anyway and saves an insert, worth 1 per unit,
    // up to how many spare units the left letter has and how many
    // copies the right letter still needs. Those flows only run between
    // adjacent letters, so one pass over the alphabet carrying the
    // previous letter's choice (kept or emptied) prices each target;
    // the answer is the cheapest target.
    pub fn make_string_good(s: String) -> i32 {
        let mut occ = [0i32; 26];
        for ch in s.bytes() {
            occ[(ch - b'a') as usize] += 1;
        }
        let max_occ = *occ.iter().max().expect("26 letters");
        let mut best = s.len() as i32; // target c = 0: delete everything
        for target in 1..=max_occ {
            let mut keep = (occ[0] - target).abs();
            let mut zero = occ[0];
            for i in 1..26 {
                let need = 0.max(target - occ[i]);
                let save_kept = 0.max(occ[i - 1] - target).min(need);
                let save_zero = occ[i - 1].min(need);
                let cost = (occ[i] - target).abs();
                let next_keep = (keep + cost - save_kept).min(zero + cost - save_zero);
                let next_zero = keep.min(zero) + occ[i];
                keep = next_keep;
                zero = next_zero;
            }
            best = best.min(keep).min(zero);
        }
        best
    }
}
