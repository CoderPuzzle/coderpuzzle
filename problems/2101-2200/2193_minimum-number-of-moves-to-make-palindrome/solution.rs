impl Solution {
    pub fn min_moves_to_make_palindrome(s: String) -> i32 {
        let mut a: Vec<u8> = s.bytes().collect();
        let mut moves: i32 = 0;
        let mut left = 0usize;
        let mut right = a.len() - 1;
        while left < right {
            if a[left] == a[right] {
                left += 1;
                right -= 1;
                continue;
            }
            // find rightmost occurrence of a[left] in (left, right]
            let mut k = right;
            while k > left && a[k] != a[left] {
                k -= 1;
            }
            if k == left {
                // a[left] is the lone middle character: nudge it one step inward
                a.swap(left, left + 1);
                moves += 1;
            } else {
                // bubble a[k] rightward to position right
                while k < right {
                    a.swap(k, k + 1);
                    k += 1;
                    moves += 1;
                }
                left += 1;
                right -= 1;
            }
        }
        moves
    }
}
