// Winning section k costs aliceArrows[k] + 1 arrows and pays k points, so
// with only 12 sections every affordable winning set can be swept.
impl Solution {
    pub fn maximum_bob_points(num_arrows: i32, alice_arrows: Vec<i32>) -> Vec<i32> {
        let (mut best_points, mut best_mask) = (0, 0);
        for mask in 1..1 << 12 {
            let (mut cost, mut points) = (0, 0);
            for k in 0..12 {
                if mask >> k & 1 == 1 {
                    cost += alice_arrows[k] + 1;
                    points += k;
                }
            }
            // Strict improvement keeps the smallest mask on ties, which pins
            // one deterministic answer among equally scoring allocations.
            if cost <= num_arrows && points > best_points {
                best_points = points;
                best_mask = mask;
            }
        }
        let mut bob = vec![0; 12];
        let mut spent = 0;
        for k in 1..12 {
            if best_mask >> k & 1 == 1 {
                bob[k] = alice_arrows[k] + 1;
                spent += bob[k];
            }
        }
        // Section 0 scores nothing, so every unspent arrow lands there.
        bob[0] = num_arrows - spent;
        bob
    }
}
