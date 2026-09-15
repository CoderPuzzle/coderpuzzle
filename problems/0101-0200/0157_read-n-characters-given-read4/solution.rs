impl Solution {
    pub fn read(file: &mut File, n: i32, buf: &mut Vec<String>) -> i32 {
        let mut total = 0;
        let mut buf4: Vec<String> = vec![String::new(); 4];
        while total < n {
            let count = file.read4(&mut buf4);
            if count == 0 {
                break;
            }
            let take = count.min(n - total);
            for index in 0..take {
                buf[(total + index) as usize] = buf4[index as usize].clone();
            }
            total += take;
        }
        total
    }
}
