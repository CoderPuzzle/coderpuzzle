impl Solution {
    pub fn climb_stairs(n: i32) -> i32 {
        // ways(i) obeys the Fibonacci recurrence: the last move onto step i
        // is a 1-step from i-1 or a 2-step from i-2, and the two groups are
        // disjoint and exhaustive, so ways(i) = ways(i-1) + ways(i-2).
        let (mut prev, mut curr) = (1, 1); // ways(0) = 1 (the empty climb), ways(1) = 1
        for _ in 1..n {
            let next = prev + curr;
            prev = curr;
            curr = next;
        }
        curr
    }
}
