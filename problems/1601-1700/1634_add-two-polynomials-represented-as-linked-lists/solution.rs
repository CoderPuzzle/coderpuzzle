impl Solution {
    pub fn add_poly(poly1: Vec<Vec<i32>>, poly2: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        let mut i = 0usize;
        let mut j = 0usize;
        while i < poly1.len() && j < poly2.len() {
            let power1 = poly1[i][0];
            let power2 = poly2[j][0];
            if power1 == power2 {
                let coefficient = poly1[i][1] + poly2[j][1];
                if coefficient != 0 {
                    result.push(vec![power1, coefficient]);
                }
                i += 1;
                j += 1;
            } else if power1 > power2 {
                result.push(poly1[i].clone());
                i += 1;
            } else {
                result.push(poly2[j].clone());
                j += 1;
            }
        }
        while i < poly1.len() {
            result.push(poly1[i].clone());
            i += 1;
        }
        while j < poly2.len() {
            result.push(poly2[j].clone());
            j += 1;
        }
        result
    }
}
