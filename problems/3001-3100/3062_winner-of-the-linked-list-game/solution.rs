impl Solution {
    pub fn game_result(head: Option<Box<ListNode>>) -> String {
        // The two values of a pair can never be equal: every even-indexed
        // value is even and every odd-indexed value is odd. One strict
        // comparison therefore always awards exactly one point per pair.
        let mut even_wins = 0;
        let mut odd_wins = 0;
        let mut pair = head.as_deref();
        while let Some(first) = pair {
            let second = first.next.as_deref().unwrap();
            if first.val > second.val {
                even_wins += 1;
            } else {
                odd_wins += 1;
            }
            pair = second.next.as_deref();
        }
        if even_wins > odd_wins {
            "Even".to_string()
        } else if odd_wins > even_wins {
            "Odd".to_string()
        } else {
            "Tie".to_string()
        }
    }
}
