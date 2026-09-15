impl Solution {
    pub fn max_chunks_to_sorted(arr: Vec<i32>) -> i32 {
        // A boundary is legal exactly when the multiset of arr's prefix
        // equals the sorted copy's prefix — values repeat, so multisets,
        // not max/min ranges, decide.
        let mut ordered = arr.clone();
        ordered.sort_unstable();
        let mut counts: std::collections::HashMap<i32, i32> = std::collections::HashMap::new();
        let mut balance: i32 = 0;
        let mut chunks: i32 = 0;
        for i in 0..arr.len() {
            // Each update adds +1 when it leaves a count nonzero (a new
            // unpaired element) and -1 when it brings one back to zero.
            let ca = {
                let c = counts.entry(arr[i]).or_insert(0);
                *c += 1;
                *c
            };
            balance += if ca > 0 { 1 } else { -1 };
            let cb = {
                let c = counts.entry(ordered[i]).or_insert(0);
                *c -= 1;
                *c
            };
            balance += if cb < 0 { 1 } else { -1 };
            // Zero balance = no unpaired elements: the prefix multisets
            // agree, so cut a chunk at the earliest such index.
            if balance == 0 {
                chunks += 1;
            }
        }
        chunks
    }
}
