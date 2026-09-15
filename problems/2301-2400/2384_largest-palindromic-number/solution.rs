impl Solution {
    // Spend each digit's full pairs into the left half, highest digit
    // first; the largest odd-count digit becomes the center. Zero
    // pairs are worthless without a nonzero digit ahead of them, so a
    // leading-zero half is stripped; all zeros -> "0".
    pub fn largest_palindromic(num: String) -> String {
        let mut cnt = [0i32; 10];
        for c in num.chars() {
            cnt[(c as u8 - b'0') as usize] += 1;
        }
        let mut half = String::new();
        let mut mid: Option<char> = None;
        for d in (0..=9usize).rev() {
            for _ in 0..cnt[d] / 2 {
                half.push((b'0' + d as u8) as char);
            }
            if mid.is_none() && cnt[d] % 2 == 1 {
                mid = Some((b'0' + d as u8) as char);
            }
        }
        let trimmed: String = half.chars().skip_while(|&c| c == '0').collect();
        if trimmed.is_empty() && mid.is_none() {
            return "0".to_string();
        }
        let mut ans = trimmed.clone();
        if let Some(m) = mid {
            ans.push(m);
        }
        ans.extend(trimmed.chars().rev());
        ans
    }
}
