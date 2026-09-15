impl Solution {
    pub fn count_of_pairs(n: i32, x: i32, y: i32) -> Vec<i32> {
        let n = n as usize;
        let (x, y) = (x as usize, y as usize);
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for house in 1..n {
            adjacency[house].push(house + 1);
            adjacency[house + 1].push(house);
        }
        if x != y {
            adjacency[x].push(y);
            adjacency[y].push(x);
        }

        let mut result = vec![0i32; n];
        for source in 1..=n {
            // Breadth-first distances from source over the chain plus the
            // extra street; every other house lands at distance >= 1.
            let mut distance = vec![-1i32; n + 1];
            distance[source] = 0;
            let mut queue = Vec::with_capacity(n);
            queue.push(source);
            let mut head = 0usize;
            while head < queue.len() {
                let house = queue[head];
                head += 1;
                for &neighbor in &adjacency[house] {
                    if distance[neighbor] < 0 {
                        distance[neighbor] = distance[house] + 1;
                        queue.push(neighbor);
                    }
                }
            }
            for target in 1..=n {
                // Skip the source itself: its distance-zero pair belongs
                // to no bucket.
                if distance[target] > 0 {
                    result[distance[target] as usize - 1] += 1;
                }
            }
        }
        result
    }
}
