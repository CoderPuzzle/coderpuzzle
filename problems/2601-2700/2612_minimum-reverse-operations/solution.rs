impl Solution {
    pub fn min_reverse_operations(n: i32, p: i32, banned: Vec<i32>, k: i32) -> Vec<i32> {
        // Alive positions of one parity as jump pointers over slots
        // (position / 2): first() returns the smallest alive slot >= pos,
        // removing a slot fuses it into its successor.
        fn first(parent: &mut Vec<usize>, mut pos: usize) -> usize {
            while parent[pos] != pos {
                parent[pos] = parent[parent[pos]];
                pos = parent[pos];
            }
            pos
        }
        let mut answer = vec![-1i32; n as usize];
        let mut parent = [vec![0usize; 0], vec![0usize; 0]];
        for parity in [0usize, 1] {
            let size = ((n as usize) + 1 - parity) / 2;
            parent[parity] = (0..=size).collect();
        }
        let mut consume = |position: i32, parent: &mut [Vec<usize>]| {
            let slot = (position >> 1) as usize;
            parent[(position & 1) as usize][slot] = slot + 1;
        };
        consume(p, &mut parent);
        for b in banned.iter() {
            consume(*b, &mut parent);
        }
        let mut queue: Vec<i32> = Vec::with_capacity(n as usize);
        queue.push(p);
        answer[p as usize] = 0;
        let mut head = 0;
        while head < queue.len() {
            let x = queue[head];
            head += 1;
            let left = 0.max(x - k + 1);
            let right = x.min(n - k);
            if left > right {
                continue;
            }
            let lo = 2 * left + k - 1 - x;
            let hi = 2 * right + k - 1 - x;
            let parity = (lo & 1) as usize;
            let step = (lo >> 1) as usize;
            let mut slot = first(&mut parent[parity], step);
            while 2 * slot + parity <= hi as usize {
                let y = (2 * slot + parity) as i32;
                answer[y as usize] = answer[x as usize] + 1;
                queue.push(y);
                parent[parity][slot] = slot + 1;
                slot = first(&mut parent[parity], slot + 1);
            }
        }
        answer
    }
}
