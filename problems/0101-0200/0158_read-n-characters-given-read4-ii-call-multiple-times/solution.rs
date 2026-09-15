impl Solution {
    pub fn read(file: &mut File, queries: Vec<i32>, buf: &mut Vec<String>) -> i32 {
        // The wrapper owns a unit Solution struct, so the carry state lives
        // beside the call: one scratch block persisted across the requests.
        let mut scratch: Vec<String> = vec![String::new(); 4];
        let mut block = 0usize;
        let mut cursor = 0usize;
        let mut total = 0i32;
        for &n in &queries {
            let mut transferred = 0;
            while transferred < n {
                if cursor == block {
                    block = file.read4(&mut scratch) as usize;
                    cursor = 0;
                    if block == 0 {
                        break;
                    }
                }
                let take = (block - cursor).min((n - transferred) as usize);
                for index in 0..take {
                    buf[(total + transferred) as usize + index] = scratch[cursor + index].clone();
                }
                cursor += take;
                transferred += take as i32;
            }
            total += transferred;
        }
        total
    }
}
