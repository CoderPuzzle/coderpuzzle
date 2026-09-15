impl Solution {
    // Next unvisited slot at or after i; path-compresses on the way.
    fn find(nxt: &mut [i32], mut i: usize) -> usize {
        let mut root = i;
        while nxt[root] != root as i32 {
            root = nxt[root] as usize;
        }
        while nxt[i] != root as i32 {
            let up = nxt[i] as usize;
            nxt[i] = root as i32;
            i = up;
        }
        root
    }

    pub fn min_operations(s: String, k: i32) -> i32 {
        let n = s.len();
        let k = k as usize;
        let z = s.bytes().filter(|&b| b == b'0').count();
        // Only the count z of zeros matters: an operation flips i of the
        // current zeros and k - i of the ones, moving z to z + k - 2 * i
        // for any legal i — one contiguous same-parity range per step.
        if z == 0 {
            return 0;
        }
        // BFS over zero counts 0..n toward 0. Two skip lists (one per
        // parity) hold the unvisited states, so each state enters the
        // queue exactly once even though edges are whole intervals.
        let mut next_even: Vec<i32> = (0..(n / 2 + 2) as i32).collect();
        let mut next_odd: Vec<i32> = (0..((n + 1) / 2 + 1) as i32).collect();
        let mut dist = vec![-1i32; n + 1];
        let mut queue: Vec<usize> = Vec::with_capacity(n + 1);
        dist[z] = 0;
        queue.push(z);
        let start = z >> 1;
        if z % 2 == 0 {
            next_even[start] = start as i32 + 1;
        } else {
            next_odd[start] = start as i32 + 1;
        }
        let mut head = 0usize;
        while head < queue.len() {
            let cur = queue[head];
            head += 1;
            let lo = 0.max(k as isize - (n as isize - cur as isize)) as usize;
            let hi = k.min(cur);
            let low = cur + k - 2 * hi;
            let high = cur + k - 2 * lo;
            let p = (cur + k) & 1;
            let d = dist[cur] + 1;
            let nxt: &mut [i32] = if p == 0 { &mut next_even } else { &mut next_odd };
            let mut j = Self::find(nxt, low >> 1);
            while j < nxt.len() - 1 {
                let v = 2 * j + p;
                if v > high {
                    break;
                }
                dist[v] = d;
                if v == 0 {
                    return d;
                }
                nxt[j] = j as i32 + 1;
                queue.push(v);
                j = Self::find(nxt, j + 1);
            }
        }
        -1
    }
}
