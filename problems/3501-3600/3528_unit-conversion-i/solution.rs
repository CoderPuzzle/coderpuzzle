impl Solution {
    pub fn base_unit_conversions(conversions: Vec<Vec<i32>>) -> Vec<i32> {
        // The conversions form a directed tree rooted at unit 0, so one BFS
        // fixes every answer: a child costs `factor` units per unit of its
        // parent, so its value is the parent's value times the factor. A
        // product reaches (10^9 + 6) * 10^9 ~ 10^18, so the multiply is an
        // i64 reduced modulo 10^9 + 7 before storing back into the i32
        // result. The vector-as-queue keeps the walk iterative — a 10^5
        // chain would overflow the stack if this were recursive.
        const MOD: i64 = 1_000_000_007;
        let n = conversions.len() + 1;
        let mut children: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for edge in &conversions {
            children[edge[0] as usize].push((edge[1] as usize, edge[2] as i64));
        }
        let mut result = vec![0_i32; n];
        result[0] = 1;
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        queue.push(0);
        let mut head = 0;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            for (target, factor) in &children[node] {
                result[*target] = (result[node] as i64 * factor % MOD) as i32;
                queue.push(*target);
            }
        }
        result
    }
}
