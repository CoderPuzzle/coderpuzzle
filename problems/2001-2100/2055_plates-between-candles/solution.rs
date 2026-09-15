impl Solution {
    pub fn plates_between_candles(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let bytes = s.as_bytes();
        let length = bytes.len();
        let mut plate_prefix = vec![0_i32; length + 1];
        let mut left_nearest = vec![-1_i32; length];
        let mut nearest = -1_i32;
        for index in 0..length {
            plate_prefix[index + 1] = plate_prefix[index] + i32::from(bytes[index] == b'*');
            if bytes[index] == b'|' {
                nearest = index as i32;
            }
            left_nearest[index] = nearest;
        }

        let mut right_nearest = vec![-1_i32; length];
        nearest = -1;
        for index in (0..length).rev() {
            if bytes[index] == b'|' {
                nearest = index as i32;
            }
            right_nearest[index] = nearest;
        }

        queries
            .iter()
            .map(|query| {
                let left_candle = right_nearest[query[0] as usize];
                let right_candle = left_nearest[query[1] as usize];
                if left_candle != -1 && right_candle != -1 && left_candle < right_candle {
                    plate_prefix[right_candle as usize] - plate_prefix[left_candle as usize]
                } else {
                    0
                }
            })
            .collect()
    }
}
