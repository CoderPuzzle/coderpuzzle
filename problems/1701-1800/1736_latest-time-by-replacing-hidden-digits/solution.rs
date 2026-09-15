impl Solution {
    // Fill each hidden digit with the largest value its seat allows: the
    // hour tens seat takes '2' unless the hour ones seat is a fixed 4-9
    // (which would build 24 or beyond), where '1' is the best legal
    // choice; the hour ones seat caps at '3' under a final '2' tens,
    // else '9'; the minute seats are unconstrained and max out at '5'
    // and '9'.
    pub fn maximum_time(time: String) -> String {
        let mut chars: Vec<char> = time.chars().collect();
        if chars[0] == '?' {
            chars[0] = if chars[1] == '?' || chars[1] <= '3' { '2' } else { '1' };
        }
        if chars[1] == '?' {
            chars[1] = if chars[0] == '2' { '3' } else { '9' };
        }
        if chars[3] == '?' {
            chars[3] = '5';
        }
        if chars[4] == '?' {
            chars[4] = '9';
        }
        chars.into_iter().collect()
    }
}
