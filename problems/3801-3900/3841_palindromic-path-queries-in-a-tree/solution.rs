impl Solution {
    pub fn palindrome_path(n: i32, edges: Vec<Vec<i32>>, s: String, queries: Vec<String>) -> Vec<bool> {
        let n = n as usize;
        // Adjacency as flat per-node vectors: two passes over the edge list.
        let mut degree = vec![0usize; n];
        for edge in &edges {
            degree[edge[0] as usize] += 1;
            degree[edge[1] as usize] += 1;
        }
        let mut adjacency: Vec<Vec<usize>> = (0..n).map(|node| Vec::with_capacity(degree[node])).collect();
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adjacency[u].push(v);
            adjacency[v].push(u);
        }

        // One iterative depth-first search from node 0 fills every static
        // structure: depth, entry/exit stamps tin/tout over 2n tick
        // positions, and the Euler walk (node on entry and after every
        // child) that the sparse table compresses. The explicit stack keeps
        // a 10^4-deep path off the call stack.
        let mut depth = vec![0i32; n];
        let mut tin = vec![0usize; n];
        let mut tout = vec![0usize; n];
        let mut first = vec![0usize; n];
        let mut walk = vec![0usize; 2 * n - 1];
        let mut cursor = vec![0usize; n];
        let mut seen = vec![false; n];
        let mut clock = 0usize;
        let mut walk_length = 0usize;
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        seen[0] = true;
        tin[0] = clock;
        clock += 1;
        first[0] = walk_length;
        walk[walk_length] = 0;
        walk_length += 1;
        stack.push(0);
        while let Some(&node) = stack.last() {
            if cursor[node] < adjacency[node].len() {
                let child = adjacency[node][cursor[node]];
                cursor[node] += 1;
                if !seen[child] {
                    seen[child] = true;
                    depth[child] = depth[node] + 1;
                    tin[child] = clock;
                    clock += 1;
                    first[child] = walk_length;
                    walk[walk_length] = child;
                    walk_length += 1;
                    stack.push(child);
                }
            } else {
                stack.pop();
                tout[node] = clock;
                clock += 1;
                if let Some(&back) = stack.last() {
                    walk[walk_length] = back;
                    walk_length += 1;
                }
            }
        }

        // Only letter parities matter, so each node carries a 26-bit mask
        // and path masks combine by XOR. The path mask of u..v is
        // rootMask(u) ^ rootMask(v) ^ letter(lca): the common ancestors
        // cancel between the two root paths, so the LCA's letter returns.
        // rootMask(x) is the XOR of every delta whose node is an
        // ancestor-or-equal of x; on tick positions those are exactly the
        // intervals [tin, tout] containing tin[x], so flipping each delta
        // at tin and tout + 2 makes rootMask(x) a prefix XOR read at
        // tin[x] + 1 — non-ancestor subtrees contribute both flips and
        // cancel. A Fenwick tree over the 2n positions serves reads/flips.
        let size = 2 * n;
        let mut letters: Vec<u8> = s.into_bytes();
        let mut delta_at = vec![0u32; size + 1];
        for node in 0..n {
            let bit = 1u32 << (letters[node] - b'a');
            delta_at[tin[node] + 1] ^= bit;
            let closing = tout[node] + 2;
            if closing <= size {
                delta_at[closing] ^= bit;
            }
        }
        let mut tree = vec![0u32; size + 1];
        let mut prefix = vec![0u32; size + 1];
        let mut running = 0u32;
        for position in 1..=size {
            running ^= delta_at[position];
            prefix[position] = running;
        }
        for position in 1..=size {
            let low = position & position.wrapping_neg();
            tree[position] = prefix[position] ^ prefix[position - low];
        }

        // Sparse table over the Euler walk: packing (depth << 17) | node
        // makes a plain u64 minimum return the shallowest node of any walk
        // range, which is the LCA. depth and node stay under 2^17, but the
        // packed key passes 2^32, hence the 64-bit widening.
        let mut levels = 1usize;
        while (1usize << levels) <= walk_length {
            levels += 1;
        }
        let mut table: Vec<Vec<u64>> = Vec::with_capacity(levels);
        let base: Vec<u64> = (0..walk_length)
            .map(|index| ((depth[walk[index]] as u64) << 17) | walk[index] as u64)
            .collect();
        table.push(base);
        for level in 1..levels {
            let half = 1usize << (level - 1);
            let previous = &table[level - 1];
            let length = walk_length - (1usize << level) + 1;
            let mut current = Vec::with_capacity(length);
            for index in 0..length {
                current.push(previous[index].min(previous[index + half]));
            }
            table.push(current);
        }
        let mut log2 = vec![0usize; walk_length + 1];
        for index in 2..=walk_length {
            log2[index] = log2[index >> 1] + 1;
        }

        let mut answer: Vec<bool> = Vec::with_capacity(queries.len());
        for query in &queries {
            let query = query.as_bytes();
            let mut space1 = 0usize;
            while query[space1] != b' ' {
                space1 += 1;
            }
            let mut space2 = space1 + 1;
            while query[space2] != b' ' {
                space2 += 1;
            }
            let parse = |from: usize, until: usize| -> usize {
                let mut value = 0usize;
                for &digit in &query[from..until] {
                    value = value * 10 + (digit - b'0') as usize;
                }
                value
            };
            if query[0] == b'u' {
                let node = parse(space1 + 1, space2);
                let letter = query[space2 + 1];
                let delta = (1u32 << (letters[node] - b'a')) ^ (1u32 << (letter - b'a'));
                if delta != 0 {
                    letters[node] = letter;
                    let mut position = tin[node] + 1;
                    while position <= size {
                        tree[position] ^= delta;
                        position += position & position.wrapping_neg();
                    }
                    let closing = tout[node] + 2;
                    if closing <= size {
                        position = closing;
                        while position <= size {
                            tree[position] ^= delta;
                            position += position & position.wrapping_neg();
                        }
                    }
                }
            } else {
                let u = parse(space1 + 1, space2);
                let v = parse(space2 + 1, query.len());
                let (mut left, mut right) = (first[u], first[v]);
                if left > right {
                    std::mem::swap(&mut left, &mut right);
                }
                let power = log2[right - left + 1];
                let row = &table[power];
                let mut best = row[left];
                let other = row[right - (1usize << power) + 1];
                if other < best {
                    best = other;
                }
                let top = (best & 131071) as usize;
                let mut mask = 0u32;
                let mut position = tin[u] + 1;
                while position > 0 {
                    mask ^= tree[position];
                    position -= position & position.wrapping_neg();
                }
                position = tin[v] + 1;
                while position > 0 {
                    mask ^= tree[position];
                    position -= position & position.wrapping_neg();
                }
                mask ^= 1u32 << (letters[top] - b'a');
                // At most one set bit <=> the mask is 0 or a power of two.
                answer.push(mask == 0 || mask & (mask - 1) == 0);
            }
        }
        answer
    }
}
