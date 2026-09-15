impl Solution {
    pub fn strobogrammatic_in_range(low: String, high: String) -> i32 {
        let low = low.as_bytes();
        let high = high.as_bytes();
        let mut count = Self::count_at_least(low);
        // Every length above len(low) contributes in full, len(high)
        // included; the lengths strictly between never touch a boundary.
        for length in low.len() + 1..=high.len() {
            count += Self::total_of_length(length);
        }
        // Subtracting count_at_least(high) also drops high itself, so put
        // it back when high is strobogrammatic.
        count -= Self::count_at_least(high);
        if Self::is_strobogrammatic(high) {
            count += 1;
        }
        count as i32
    }

    // Digits a string of the given length may place at half-position
    // `position`: the outermost digit cannot be 0 (no leading zeros except
    // "0" itself), and an odd length's exact middle must self-rotate,
    // which rules out 6 and 9 there.
    fn choices_at(position: usize, length: usize, half: usize) -> &'static [u8] {
        if position == 0 && length > 1 {
            return b"1689";
        }
        if length % 2 == 1 && position == half - 1 {
            return b"018";
        }
        b"01689"
    }

    // Closed form: the first half decides the whole string, so each free
    // half-position multiplies the count.
    fn total_of_length(length: usize) -> usize {
        let half = (length + 1) / 2;
        let mut total = 1;
        for position in (0..half).rev() {
            total *= Self::choices_at(position, length, half).len();
        }
        total
    }

    // Strobogrammatic strings of the boundary's own length that are >=
    // boundary. A candidate first differs from the boundary at one
    // half-position: a larger digit there settles the comparison, and the
    // inner positions complete freely, in ways[position + 1] ways.
    // Equal-length digit slices compare numerically (neither side has a
    // leading zero), so byte order is numeric order.
    fn count_at_least(boundary: &[u8]) -> usize {
        let length = boundary.len();
        let half = (length + 1) / 2;
        let mut ways = vec![1usize; half + 1];
        for position in (0..half).rev() {
            ways[position] = Self::choices_at(position, length, half).len() * ways[position + 1];
        }
        let mut count = 0;
        for position in 0..half {
            let options = Self::choices_at(position, length, half);
            let digit = boundary[position];
            for &option in options {
                if option > digit {
                    count += ways[position + 1];
                }
            }
            if !options.contains(&digit) {
                return count;
            }
        }
        // Every half-position matched, so the only surviving candidate is
        // the mirror completion of the boundary's own first half.
        let mut candidate = boundary[..half].to_vec();
        for &digit in boundary[..length - half].iter().rev() {
            candidate.push(Self::rotate(digit));
        }
        count + (candidate.as_slice() >= boundary) as usize
    }

    fn is_strobogrammatic(value: &[u8]) -> bool {
        (0..value.len()).all(|i| Self::rotate(value[i]) == value[value.len() - 1 - i])
    }

    // 0, 1 and 8 rotate to themselves, 6 and 9 swap; anything else is not
    // a strobogrammatic digit and fails any equality test.
    fn rotate(digit: u8) -> u8 {
        match digit {
            b'6' => b'9',
            b'9' => b'6',
            b'0' | b'1' | b'8' => digit,
            _ => b'?',
        }
    }
}
