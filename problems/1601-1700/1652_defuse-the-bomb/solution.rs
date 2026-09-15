impl Solution {
    pub fn decrypt(code: Vec<i32>, k: i32) -> Vec<i32> {
        let n = code.len() as i32;
        let mut result = vec![0; n as usize];
        if k == 0 {
            return result;
        }
        for i in 0..n {
            let mut total = 0;
            if k > 0 {
                for j in 1..=k {
                    total += code[((i + j) % n) as usize];
                }
            } else {
                for j in 1..=-k {
                    total += code[(((i - j) % n + n) % n) as usize];
                }
            }
            result[i as usize] = total;
        }
        result
    }
}
