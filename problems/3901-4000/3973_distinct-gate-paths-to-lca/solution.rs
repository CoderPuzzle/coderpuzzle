const GATE_MOD: i64 = 1_000_000_007;

fn gate_multiply(a: [i64; 4], b: [i64; 4]) -> [i64; 4] {
    [
        (a[0] * b[0] + a[1] * b[2]) % GATE_MOD,
        (a[0] * b[1] + a[1] * b[3]) % GATE_MOD,
        (a[2] * b[0] + a[3] * b[2]) % GATE_MOD,
        (a[2] * b[1] + a[3] * b[3]) % GATE_MOD,
    ]
}

impl Solution {
    pub fn distinct_paths(n: i32, parent: Vec<i32>, gates: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut levels = 1;
        while (1usize << levels) <= n {
            levels += 1;
        }
        let mut children = vec![vec![]; n];
        for node in 1..n {
            children[parent[node] as usize].push(node);
        }
        let mut depth = vec![0usize; n];
        let mut order = vec![0usize];
        let mut cursor = 0;
        while cursor < order.len() {
            let node = order[cursor];
            for &child in &children[node] {
                depth[child] = depth[node] + 1;
                order.push(child);
            }
            cursor += 1;
        }
        let mut up = vec![vec![0usize; n]; levels];
        let mut matrices = vec![vec![[1, 0, 0, 1]; n]; levels];
        for node in 1..n {
            up[0][node] = parent[node] as usize;
            matrices[0][node] = [
                gates[node][1] as i64,
                gates[node][2] as i64,
                gates[node][2] as i64,
                gates[node][0] as i64,
            ];
        }
        for level in 1..levels {
            for node in 0..n {
                let middle = up[level - 1][node];
                up[level][node] = up[level - 1][middle];
                matrices[level][node] = gate_multiply(matrices[level - 1][node], matrices[level - 1][middle]);
            }
        }
        let ancestor = |mut a: usize, mut b: usize| {
            if depth[a] < depth[b] {
                std::mem::swap(&mut a, &mut b);
            }
            let difference = depth[a] - depth[b];
            for level in 0..levels {
                if difference >> level & 1 == 1 {
                    a = up[level][a];
                }
            }
            if a == b {
                return a;
            }
            for level in (0..levels).rev() {
                if up[level][a] != up[level][b] {
                    a = up[level][a];
                    b = up[level][b];
                }
            }
            up[0][a]
        };
        let ways = |mut node: usize, card: usize, stop: usize| {
            let mut value = [1, 0, 0, 1];
            let difference = depth[node] - depth[stop];
            for level in (0..levels).rev() {
                if difference >> level & 1 == 1 {
                    value = gate_multiply(value, matrices[level][node]);
                    node = up[level][node];
                }
            }
            if card == 0 {
                (value[0] + value[1]) % GATE_MOD
            } else {
                (value[2] + value[3]) % GATE_MOD
            }
        };
        let mut answer = 0;
        for query in queries {
            let stop = ancestor(query[0] as usize, query[2] as usize);
            answer ^= (ways(query[0] as usize, query[1] as usize, stop)
                * ways(query[2] as usize, query[3] as usize, stop)
                % GATE_MOD) as i32;
        }
        answer
    }
}
