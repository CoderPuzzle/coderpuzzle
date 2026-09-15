impl Solution {
    pub fn is_additive_number(num: String) -> bool {
        // The first two numbers fix the whole sequence, so try each split of
        // them and let string addition verify the remainder. No machine
        // integers anywhere: rejected candidates can outgrow 64 bits.
        let num = num.as_bytes();
        let n = num.len();
        for i in 1..n {
            if !Self::valid(num, 0, i) {
                continue;
            }
            // j < n leaves at least one digit for the third number.
            for j in i + 1..n {
                if !Self::valid(num, i, j) {
                    continue;
                }
                if Self::consumes(num, &num[..i], &num[i..j], j) {
                    return true;
                }
            }
        }
        false
    }

    fn valid(num: &[u8], start: usize, end: usize) -> bool {
        // Multi-digit numbers may not open with '0'; a lone 0 is legal.
        end - start == 1 || num[start] != b'0'
    }

    fn consumes(num: &[u8], first: &[u8], second: &[u8], start: usize) -> bool {
        // Greedy walk: the next number's digits are exactly the sum's
        // digits, so its length is never a choice.
        let mut first = first;
        let mut second = second;
        let mut start = start;
        while start < num.len() {
            let total = Self::add(first, second);
            if !num[start..].starts_with(&total) {
                return false;
            }
            start += total.len();
            first = second;
            // The sum just matched digit for digit, so it lives in num.
            second = &num[start - total.len()..start];
        }
        true
    }

    fn add(a: &[u8], b: &[u8]) -> Vec<u8> {
        // Schoolbook addition on digit characters, least significant
        // first, carrying as we go.
        let mut digits: Vec<u8> = Vec::with_capacity(a.len() + b.len() + 1);
        let mut carry = 0u32;
        let (mut i, mut j) = (a.len(), b.len());
        while i > 0 || j > 0 || carry > 0 {
            let mut total = carry;
            if i > 0 {
                i -= 1;
                total += (a[i] - b'0') as u32;
            }
            if j > 0 {
                j -= 1;
                total += (b[j] - b'0') as u32;
            }
            digits.push(b'0' + (total % 10) as u8);
            carry = total / 10;
        }
        digits.reverse();
        digits
    }
}
