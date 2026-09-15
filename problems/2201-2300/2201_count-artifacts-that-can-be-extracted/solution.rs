// Mark every excavated cell once in a boolean grid, then each rectangle test
// is a constant-time lookup per cell — dig is never rescanned.
impl Solution {
    pub fn dig_artifacts(n: i32, artifacts: Vec<Vec<i32>>, dig: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut dug = vec![vec![false; n]; n];
        for cell in &dig {
            dug[cell[0] as usize][cell[1] as usize] = true;
        }
        let mut extracted = 0;
        for rect in &artifacts {
            let (r1, c1, r2, c2) = (rect[0] as usize, rect[1] as usize, rect[2] as usize, rect[3] as usize);
            let mut complete = true;
            'rect: for r in r1..=r2 {
                for c in c1..=c2 {
                    if !dug[r][c] {
                        complete = false;
                        break 'rect;
                    }
                }
            }
            if complete {
                extracted += 1;
            }
        }
        extracted
    }
}
