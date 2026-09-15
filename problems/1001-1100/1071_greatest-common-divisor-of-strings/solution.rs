impl Solution {
    pub fn gcd_of_strings(str1: String, str2: String) -> String {
        // A common divisor string can only exist if the two strings agree
        // on their concatenation order; that is exactly the algebraic
        // signature of both being built from repetitions of one string.
        if format!("{}{}", str1, str2) != format!("{}{}", str2, str1) {
            return String::new();
        }
        // The largest such divisor is the prefix whose length is the GCD
        // of the two string lengths, found via the Euclidean algorithm.
        let mut a = str1.len();
        let mut b = str2.len();
        while b != 0 {
            let t = b;
            b = a % b;
            a = t;
        }
        str1[..a].to_string()
    }
}
