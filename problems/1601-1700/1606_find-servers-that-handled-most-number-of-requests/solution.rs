use std::cmp::Reverse;
use std::collections::BinaryHeap;

fn update(tree: &mut [i32], k: usize, server: usize, delta: i32) {
    let mut i = server + 1;
    while i <= k {
        tree[i] += delta;
        i += i & i.wrapping_neg();
    }
}

fn query(tree: &[i32], count: usize) -> i32 {
    let mut sum = 0;
    let mut i = count;
    while i > 0 {
        sum += tree[i];
        i -= i & i.wrapping_neg();
    }
    sum
}

fn find_kth(tree: &[i32], k: usize, rank: i32) -> usize {
    let mut pos = 0usize;
    let mut pw = 1usize;
    while pw * 2 <= k {
        pw *= 2;
    }
    let mut remaining = rank;
    while pw > 0 {
        if pos + pw <= k && tree[pos + pw] < remaining {
            pos += pw;
            remaining -= tree[pos];
        }
        pw /= 2;
    }
    pos
}

impl Solution {
    pub fn busiest_servers(k: i32, arrival: Vec<i32>, load: Vec<i32>) -> Vec<i32> {
        let k = k as usize;
        let mut tree = vec![0i32; k + 1];
        for server in 0..k {
            update(&mut tree, k, server, 1);
        }

        let n = arrival.len();
        let mut counts = vec![0i32; k];
        // Reverse turns BinaryHeap's max-heap into a min-heap of
        // (finish time, server id).
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();

        for i in 0..n {
            let start_time = arrival[i] as i64;
            while let Some(&Reverse((finish, _))) = heap.peek() {
                if finish > start_time {
                    break;
                }
                let Reverse((_, freed)) = heap.pop().unwrap();
                update(&mut tree, k, freed, 1);
            }

            let total_free = query(&tree, k);
            if total_free == 0 {
                continue;
            }

            let start = i % k;
            let before_start = query(&tree, start);
            let server = if before_start < total_free {
                find_kth(&tree, k, before_start + 1)
            } else {
                find_kth(&tree, k, 1)
            };

            update(&mut tree, k, server, -1);
            counts[server] += 1;
            heap.push(Reverse((start_time + load[i] as i64, server)));
        }

        let busiest = *counts.iter().max().unwrap();
        (0..k).filter(|&s| counts[s] == busiest).map(|s| s as i32).collect()
    }
}
