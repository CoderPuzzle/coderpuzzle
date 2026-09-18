pub struct TreeAncestor {
    levels: usize,
    up: Vec<Vec<i32>>,
}

impl TreeAncestor {
    pub fn new(n: i32, parent: Vec<i32>) -> Self {
        let n = n as usize;
        let mut levels = 1;
        while (1 << levels) <= n {
            levels += 1;
        }
        let mut up: Vec<Vec<i32>> = Vec::with_capacity(levels);
        up.push(parent);
        for _ in 1..levels {
            let previous = up.last().unwrap();
            let current = previous
                .iter()
                .map(|&v| if v < 0 { -1 } else { previous[v as usize] })
                .collect::<Vec<i32>>();
            up.push(current);
        }
        TreeAncestor { levels, up }
    }

    pub fn getKthAncestor(&mut self, mut node: i32, k: i32) -> i32 {
        if k >= 1 << self.levels {
            return -1;
        }
        let mut k = k as u32;
        let mut level = 0;
        while k != 0 && node >= 0 {
            if k & 1 == 1 {
                node = self.up[level][node as usize];
            }
            k >>= 1;
            level += 1;
        }
        node
    }
}
