use std::collections::HashMap;

// A translation slides every 1 of one image by one shared vector, so a 1
// at (i1, j1) in img1 sits on a 1 at (i2, j2) in img2 exactly under the
// shift that carries (i2, j2) onto (i1, j1) — the delta between the two
// cells. Counting over all pairs of 1-cells how often each delta occurs
// scores every shift at once, and the largest count is the largest
// overlap. Delta components lie in [-29, 29], so the packed key
// dr*100 + dc is injective.
impl Solution {
    pub fn largest_overlap(img1: Vec<Vec<i32>>, img2: Vec<Vec<i32>>) -> i32 {
        let n = img1.len();
        let mut ones1 = Vec::new();
        let mut ones2 = Vec::new();
        for i in 0..n {
            for j in 0..n {
                if img1[i][j] == 1 {
                    ones1.push((i as i32, j as i32));
                }
                if img2[i][j] == 1 {
                    ones2.push((i as i32, j as i32));
                }
            }
        }
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut best = 0;
        for &(i1, j1) in &ones1 {
            for &(i2, j2) in &ones2 {
                let delta = (i1 - i2) * 100 + (j1 - j2);
                let hits = counts.entry(delta).or_insert(0);
                *hits += 1;
                if *hits > best {
                    best = *hits;
                }
            }
        }
        best
    }
}
