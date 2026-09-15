impl Solution {
    pub fn weighted_sum(parent: Vec<i32>, nums: Vec<i32>) -> i64 {
        let n = parent.len();
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for i in 1..n {
            children[parent[i] as usize].push(i);
        }

        let mut depth = vec![0_usize; n];
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        depth[0] = 1;
        queue.push(0);
        let mut head = 0;
        while head < queue.len() {
            let node = queue[head];
            head += 1;
            for &child in &children[node] {
                depth[child] = depth[node] + 1;
                queue.push(child);
            }
        }

        let height = *depth.iter().max().unwrap();

        let mut total = 0_i64;
        for i in 0..n {
            total += nums[i] as i64 * (height - depth[i] + 1) as i64;
        }
        total
    }
}
