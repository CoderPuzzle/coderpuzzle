// Canvas of "next possibly-unpainted cell" pointers: painting a cell points
// it one past itself and find compresses the skips, so every unit of the
// painting is walked exactly once across all n days.
impl Solution {
    pub fn amount_painted(paint: Vec<Vec<i32>>) -> Vec<i32> {
        let limit = 50001;
        let mut nxt: Vec<i32> = (0..=limit).collect();
        fn find(nxt: &mut [i32], cell: i32) -> i32 {
            let mut root = cell;
            while nxt[root as usize] != root {
                root = nxt[root as usize];
            }
            let mut cell = cell;
            while nxt[cell as usize] != root {
                // path compression
                let forward = nxt[cell as usize];
                nxt[cell as usize] = root;
                cell = forward;
            }
            root
        }
        let mut worklog = Vec::with_capacity(paint.len());
        for day in &paint {
            let mut area = 0;
            let mut cell = find(&mut nxt, day[0]);
            while cell < day[1] {
                area += 1;
                nxt[cell as usize] = cell + 1;
                cell = find(&mut nxt, cell + 1);
            }
            worklog.push(area);
        }
        worklog
    }
}
