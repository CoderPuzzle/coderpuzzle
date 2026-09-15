impl Solution {
    pub fn decimal_representation(n: i32) -> Vec<i32> {
        // Each nonzero digit contributes exactly one base-10 component --
        // its digit times the place it sits at -- and this count is optimal:
        // adding terms can only merge nonzero positions, never create them.
        let mut components: Vec<i32> = Vec::with_capacity(10);
        let mut rest = n as i64;
        // The place walks one step past 10^9 on the final multiply, so it
        // needs more headroom than i32 provides.
        let mut place: i64 = 1;
        while rest > 0 {
            let digit = rest % 10;
            if digit > 0 {
                components.push((digit * place) as i32);
            }
            rest /= 10;
            place *= 10;
        }
        // Peeled from the ones place up, so reverse into descending order.
        components.reverse();
        components
    }
}
