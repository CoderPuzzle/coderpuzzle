impl Solution {
    // The output mirrors the input format, so parsing and rendering are half
    // the problem: both sides of the multiplication travel as "real+imaginaryi"
    // with the imaginary part's sign included in its own digits.
    pub fn complex_number_multiply(num1: String, num2: String) -> String {
        // Parse: drop the trailing 'i', then split at the LAST '+' — the
        // imaginary part may itself be negative, but the real part never
        // carries a '+', so that final '+' is the one true seam.
        let (a, b) = Self::parts(&num1);
        let (c, d) = Self::parts(&num2);
        // Multiply: (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
        let real = a * c - b * d;
        let imag = a * d + b * c;
        // Render: the '+' is literal, so a negative imaginary part stays
        // "0+-2i", never folded to "0-2i".
        format!("{}+{}i", real, imag)
    }

    fn parts(num: &str) -> (i32, i32) {
        let body = &num[..num.len() - 1];
        let seam = body.rfind('+').unwrap();
        (body[..seam].parse().unwrap(), body[seam + 1..].parse().unwrap())
    }
}
