impl Solution {
    // Stones joined by shared rows and columns split the plane into connected
    // components. Inside a component of k stones any k - 1 can go: peel the
    // component down to one survivor, every removal still sharing a row or
    // column with a stone that remains. Stones of different components never
    // share a line, so the answer is n minus the number of components —
    // union-find merges each stone with the first stone registered in its row
    // and in its column, and the roots count the components.
    pub fn remove_stones(stones: Vec<Vec<i32>>) -> i32 {
        let n = stones.len();
        let mut parent: Vec<usize> = (0..n).collect();
        let mut size: Vec<i32> = vec![1; n];

        fn find(parent: &mut Vec<usize>, x: usize) -> usize {
            let mut x = x;
            while parent[x] != x {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            x
        }

        fn union(parent: &mut Vec<usize>, size: &mut Vec<i32>, a: usize, b: usize) {
            let mut ra = find(parent, a);
            let mut rb = find(parent, b);
            if ra == rb {
                return;
            }
            if size[ra] < size[rb] {
                std::mem::swap(&mut ra, &mut rb);
            }
            parent[rb] = ra;
            size[ra] += size[rb];
        }

        use std::collections::HashMap;
        let mut first_in_row: HashMap<i32, usize> = HashMap::new();
        let mut first_in_col: HashMap<i32, usize> = HashMap::new();
        for i in 0..n {
            let x = stones[i][0];
            let y = stones[i][1];
            if let Some(&j) = first_in_row.get(&x) {
                union(&mut parent, &mut size, i, j);
            } else {
                first_in_row.insert(x, i);
            }
            if let Some(&j) = first_in_col.get(&y) {
                union(&mut parent, &mut size, i, j);
            } else {
                first_in_col.insert(y, i);
            }
        }

        let mut components = 0;
        for i in 0..n {
            if find(&mut parent, i) == i {
                components += 1;
            }
        }
        (n - components) as i32
    }
}
