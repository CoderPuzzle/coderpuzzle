impl Solution {
    pub fn count_complete_components(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size = vec![1usize; n];
        for edge in &edges {
            let mut ra = Self::find(&mut parent, edge[0] as usize);
            let mut rb = Self::find(&mut parent, edge[1] as usize);
            if ra != rb {
                if size[ra] < size[rb] {
                    std::mem::swap(&mut ra, &mut rb);
                }
                parent[rb] = ra;
                size[ra] += size[rb];
            }
        }
        let mut edge_count = vec![0usize; n];
        for edge in &edges {
            edge_count[Self::find(&mut parent, edge[0] as usize)] += 1;
        }
        let mut complete = 0;
        for v in 0..n {
            if Self::find(&mut parent, v) == v && edge_count[v] == size[v] * (size[v] - 1) / 2 {
                complete += 1;
            }
        }
        complete as i32
    }

    fn find(parent: &mut [usize], x: usize) -> usize {
        let mut x = x;
        while parent[x] != x {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        x
    }
}
