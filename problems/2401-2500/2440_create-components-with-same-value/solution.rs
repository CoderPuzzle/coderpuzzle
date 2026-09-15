impl Solution {
    pub fn component_value(nums: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (a, b) = (edge[0] as usize, edge[1] as usize);
            adjacency[a].push(b);
            adjacency[b].push(a);
        }

        // iterative DFS from node 0: parents + a visitation order whose
        // reverse is a valid post-order
        let mut parent = vec![-1i32; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        stack.push(0);
        while let Some(node) = stack.pop() {
            order.push(node);
            for &nxt in &adjacency[node] {
                if nxt as i32 != parent[node] {
                    parent[nxt] = node as i32;
                    stack.push(nxt);
                }
            }
        }

        // subtree sums: everything a node keeps after its own greedy cuts
        let mut sums = nums.clone();
        let largest = *nums.iter().max().unwrap();
        for &node in order.iter().rev() {
            let p = parent[node];
            if p >= 0 {
                sums[p as usize] += sums[node];
            }
        }

        let total = sums[0];
        let mut counts: Vec<i32> = Vec::new();
        let mut divisor = 1i64;
        while divisor * divisor <= total as i64 {
            if total as i64 % divisor == 0 {
                counts.push(divisor as i32);
                if divisor != total as i64 / divisor {
                    counts.push((total as i64 / divisor) as i32);
                }
            }
            divisor += 1;
        }
        counts.sort_unstable_by(|a, b| b.cmp(a));
        for k in counts {
            let value = total / k;
            if value < largest {
                continue;
            }
            let mut components = 0;
            for &s in &sums {
                if s % value == 0 {
                    components += 1;
                }
            }
            if components == k {
                return k - 1;
            }
        }
        0
    }
}
