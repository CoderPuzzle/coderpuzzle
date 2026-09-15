impl Solution {
    pub fn largest_multiple_of_three(digits: Vec<i32>) -> String {
        let mut counts = [0usize; 10];
        let mut total = 0i32;
        for &d in &digits {
            counts[d as usize] += 1;
            total += d;
        }

        let remainder = (total % 3) as usize;
        if remainder == 1 {
            if !drop(&mut counts, 1, 1) {
                drop(&mut counts, 2, 2);
            }
        } else if remainder == 2 {
            if !drop(&mut counts, 1, 2) {
                drop(&mut counts, 2, 1);
            }
        }

        let mut text = String::new();
        for d in (0..=9).rev() {
            for _ in 0..counts[d] {
                text.push((b'0' + d as u8) as char);
            }
        }
        let any = counts.iter().any(|&c| c != 0);
        if text.is_empty() || text.starts_with('0') {
            return if any { "0".to_string() } else { String::new() };
        }
        text
    }
}

fn drop(counts: &mut [usize; 10], mut drop_count: usize, cls: usize) -> bool {
    let mut d = cls;
    while d <= 9 {
        let take = counts[d].min(drop_count);
        counts[d] -= take;
        drop_count -= take;
        if drop_count == 0 {
            return true;
        }
        d += 3;
    }
    false
}
