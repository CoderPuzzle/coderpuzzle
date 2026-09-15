impl Solution {
    pub fn process_queries(queries: Vec<i32>, m: i32) -> Vec<i32> {
        let mut p: Vec<i32> = (1..=m).collect();
        let mut result = Vec::with_capacity(queries.len());
        for &q in &queries {
            let pos = p.iter().position(|&x| x == q).unwrap() as i32;
            result.push(pos);
            p.remove(pos as usize);
            p.insert(0, q);
        }
        result
    }
}
