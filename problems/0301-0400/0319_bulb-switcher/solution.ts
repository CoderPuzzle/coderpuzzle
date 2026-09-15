function bulbSwitch(n: number): number {
    // Round d toggles bulb i exactly when d divides i, so bulb i flips
    // once per divisor and ends on iff that divisor count is odd.
    // Divisors pair d with i / d; only a perfect square leaves its middle
    // divisor d = i / d unpaired, so the bulbs still on are exactly the
    // squares 1, 4, 9, … — Example 1 ends [on, off, off] with bulb 1
    // alone lit. Round the float root to the nearest integer, then the
    // one squaring comparison settles any rounding — floor(sqrt(n))
    // without ever truncating a float that landed low.
    let root = Math.round(Math.sqrt(n));
    if (root * root > n) root--;
    return root;
}
