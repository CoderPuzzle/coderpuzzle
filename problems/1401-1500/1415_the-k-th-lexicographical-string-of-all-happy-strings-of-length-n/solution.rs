impl Solution {
    pub fn get_happy_string(n: i32, k: i32) -> String {
        let n = n as usize;
        let total: usize = 3 * (1usize << (n - 1));
        if k as usize > total {
            return String::new();
        }
        let letters = [b'a', b'b', b'c'];
        let mut result = Vec::with_capacity(n);
        let mut block = total / 3;
        let mut rank = (k as usize) - 1;
        for i in 0..n {
            let candidates: Vec<u8> = if i == 0 {
                letters.to_vec()
            } else {
                let previous = result[result.len() - 1];
                letters.iter().cloned().filter(|&c| c != previous).collect()
            };
            let index = rank / block;
            rank %= block;
            result.push(candidates[index]);
            block /= 2;
        }
        String::from_utf8(result).unwrap()
    }
}
