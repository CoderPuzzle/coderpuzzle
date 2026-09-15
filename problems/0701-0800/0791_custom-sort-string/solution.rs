impl Solution {
    pub fn custom_sort_string(order: String, s: String) -> String {
        // How many of each letter s holds; the alphabet is a fixed
        // constant, so 26 slots replace a hash map.
        let mut counts = [0i32; 26];
        for &byte in s.as_bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        let mut out = String::with_capacity(s.len());
        // Emission pass 1: walk order itself, emitting each letter it
        // names as many times as s holds it. order's sequence IS the
        // relative order the answer must carry, so this prefix already
        // satisfies it; letters absent from s contribute nothing. The
        // zeroing doubles as a membership mark for pass 2.
        for &byte in order.as_bytes() {
            let slot = (byte - b'a') as usize;
            if counts[slot] > 0 {
                for _ in 0..counts[slot] {
                    out.push(byte as char);
                }
                counts[slot] = 0;
            }
        }
        // Emission pass 2: leftovers. Letters order never mentions are
        // unconstrained, so the pinned form sends them to the tail in
        // their original s order — walk s and keep the still-counted.
        for &byte in s.as_bytes() {
            let slot = (byte - b'a') as usize;
            if counts[slot] > 0 {
                out.push(byte as char);
                counts[slot] -= 1;
            }
        }
        out
    }
}
