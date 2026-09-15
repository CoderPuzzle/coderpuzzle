use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_cost(n: i32, highways: Vec<Vec<i32>>, discounts: i32) -> i32 {
        let n = n as usize;
        let discounts = discounts as usize;
        let mut graph = vec![Vec::<(usize, i32)>::new(); n];
        for highway in highways {
            let left = highway[0] as usize;
            let right = highway[1] as usize;
            graph[left].push((right, highway[2]));
            graph[right].push((left, highway[2]));
        }

        let mut distances = vec![vec![i64::MAX; discounts + 1]; n];
        distances[0][0] = 0;
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0_i64, 0_usize, 0_usize)));
        while let Some(Reverse((cost, city, used))) = heap.pop() {
            if cost != distances[city][used] {
                continue;
            }
            if city == n - 1 {
                return cost as i32;
            }
            for &(neighbor, toll) in &graph[city] {
                let full_cost = cost + toll as i64;
                if full_cost < distances[neighbor][used] {
                    distances[neighbor][used] = full_cost;
                    heap.push(Reverse((full_cost, neighbor, used)));
                }
                if used < discounts {
                    let discounted_cost = cost + (toll / 2) as i64;
                    if discounted_cost < distances[neighbor][used + 1] {
                        distances[neighbor][used + 1] = discounted_cost;
                        heap.push(Reverse((discounted_cost, neighbor, used + 1)));
                    }
                }
            }
        }
        -1
    }
}
