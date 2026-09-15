impl Solution {
    // Two notations name the same number exactly when their exact rational
    // values coincide. Parse each string into an integer part plus an exact
    // fraction: with a repeating part, the fractional value is
    // (int(nonrep + rep) - int(nonrep)) over 10^len(nonrep) * (10^len(rep) - 1);
    // without one, int(nonrep) over 10^len(nonrep). A numerator equal to the
    // denominator is the all-trailing-9s carry — 0.9(9) is exactly 1 — so it
    // rolls into the integer part. Parts are at most four digits, so numerator
    // and denominator stay below 10^8 and every cross product below 10^16,
    // two orders inside an i64.
    pub fn is_rational_equal(s: String, t: String) -> bool {
        let (whole_s, num_s, den_s) = Self::fraction(&s);
        let (whole_t, num_t, den_t) = Self::fraction(&t);
        whole_s == whole_t && num_s * den_t == num_t * den_s
    }

    // The value of one notation as (whole, numerator, denominator), with the
    // trailing-9s carry already folded into the whole part.
    fn fraction(x: &str) -> (i64, i64, i64) {
        let (integer, rest) = match x.split_once('.') {
            Some((head, tail)) => (head, tail),
            None => (x, ""),
        };
        let (non_rep, rep) = match rest.split_once('(') {
            Some((head, tail)) => (head, &tail[..tail.len() - 1]), // drop the ')'
            None => (rest, ""),
        };
        let base = 10_i64.pow(non_rep.len() as u32);
        let (numerator, denominator) = if rep.is_empty() {
            (Self::digits(non_rep), base)
        } else {
            let joined = format!("{non_rep}{rep}");
            (
                Self::digits(&joined) - Self::digits(non_rep),
                base * (10_i64.pow(rep.len() as u32) - 1),
            )
        };
        let mut whole = Self::digits(integer);
        if numerator == denominator {
            // 0.9(9) carries into the whole part
            whole += 1;
            return (whole, 0, 1);
        }
        (whole, numerator, denominator)
    }

    fn digits(s: &str) -> i64 {
        if s.is_empty() {
            return 0;
        }
        s.parse().unwrap()
    }
}
