impl Solution {
    pub fn max_product(s: String) -> i32 {
        let bytes = s.as_bytes();
        let size = 1usize << bytes.len();
        let mut palindrome_length = vec![0i32; size];

        for mask in 1..size {
            let subsequence: Vec<u8> = (0..bytes.len())
                .filter(|&index| mask & (1 << index) != 0)
                .map(|index| bytes[index])
                .collect();
            if subsequence.iter().eq(subsequence.iter().rev()) {
                palindrome_length[mask] = subsequence.len() as i32;
            }
        }

        let mut answer = 0;
        let full = size - 1;
        for first in 1..size {
            if palindrome_length[first] == 0 {
                continue;
            }
            let remaining = full ^ first;
            let mut second = remaining;
            while second != 0 {
                answer = answer.max(palindrome_length[first] * palindrome_length[second]);
                second = (second - 1) & remaining;
            }
        }
        answer
    }
}
