use std::collections::HashMap;
use std::collections::HashSet;
use std::collections::VecDeque;

impl Solution {
    pub fn min_jumps(nums: Vec<i32>) -> i32 {
        // BFS over indices. When a prime-valued index p is first settled,
        // every index whose value is divisible by p joins the next BFS
        // layer, so the bucket of p is cleared after that single use —
        // any later prime-p index is strictly farther. Buckets are built
        // lazily by walking multiples of p up to max(nums) through a
        // value -> indices table.
        let n = nums.len();
        if n == 1 {
            return 0;
        }
        let limit = *nums.iter().max().unwrap() as usize;
        let mut is_prime = vec![true; limit + 1];
        is_prime[0] = false;
        if limit >= 1 {
            is_prime[1] = false;
        }
        let mut f = 2usize;
        while f * f <= limit {
            if is_prime[f] {
                let mut m = f * f;
                while m <= limit {
                    is_prime[m] = false;
                    m += f;
                }
            }
            f += 1;
        }
        let mut by_value: HashMap<i32, Vec<usize>> = HashMap::new();
        for (i, &v) in nums.iter().enumerate() {
            by_value.entry(v).or_default().push(i);
        }
        let mut dist = vec![-1i32; n];
        dist[0] = 0;
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        let mut used: HashSet<i32> = HashSet::new();
        while let Some(i) = queue.pop_front() {
            let d = dist[i] + 1;
            if i > 0 && dist[i - 1] == -1 {
                dist[i - 1] = d;
                queue.push_back(i - 1);
            }
            if i + 1 < n && dist[i + 1] == -1 {
                dist[i + 1] = d;
                queue.push_back(i + 1);
            }
            let p = nums[i];
            if p > 1 && is_prime[p as usize] && !used.contains(&p) {
                used.insert(p);
                let mut bucket: Vec<usize> = Vec::new();
                let mut m = p;
                while m <= limit as i32 {
                    if let Some(list) = by_value.get(&m) {
                        bucket.extend_from_slice(list);
                    }
                    m += p;
                }
                for j in bucket {
                    if dist[j] == -1 {
                        dist[j] = d;
                        queue.push_back(j);
                    }
                }
            }
        }
        dist[n - 1]
    }
}
