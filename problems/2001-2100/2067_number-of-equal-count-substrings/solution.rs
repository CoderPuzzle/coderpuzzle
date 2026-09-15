impl Solution {
    pub fn equal_count_substrings(s: String, count: i32) -> i32 {
        let bytes = s.as_bytes();
        let mut answer = 0_i32;
        for distinct in 1..=26_i32 {
            let window_length = (distinct * count) as usize;
            if window_length > bytes.len() {
                break;
            }
            let mut frequencies = [0_i32; 26];
            let mut present = 0_i32;
            let mut exact = 0_i32;

            for right in 0..bytes.len() {
                let mut index = (bytes[right] - b'a') as usize;
                if frequencies[index] == 0 {
                    present += 1;
                }
                if frequencies[index] == count {
                    exact -= 1;
                }
                frequencies[index] += 1;
                if frequencies[index] == count {
                    exact += 1;
                }

                if right >= window_length {
                    index = (bytes[right - window_length] - b'a') as usize;
                    if frequencies[index] == count {
                        exact -= 1;
                    }
                    frequencies[index] -= 1;
                    if frequencies[index] == count {
                        exact += 1;
                    }
                    if frequencies[index] == 0 {
                        present -= 1;
                    }
                }
                if right + 1 >= window_length && present == distinct && exact == distinct {
                    answer += 1;
                }
            }
        }
        answer
    }
}
