class Solution:
    def isRationalEqual(self, s: str, t: str) -> bool:
        # Two notations name the same number exactly when their exact
        # rational values coincide. Parse each string into an integer part
        # plus an exact fraction: with a repeating part, the fractional
        # value is (int(nonrep + rep) - int(nonrep)) over
        # 10^len(nonrep) * (10^len(rep) - 1); without one, int(nonrep)
        # over 10^len(nonrep). A numerator equal to the denominator is the
        # all-trailing-9s carry — 0.9(9) is exactly 1 — so it rolls into
        # the integer part. Parts are at most four digits, so numerator
        # and denominator stay below 10^8 and every cross product below
        # 10^16, far inside native integer range.
        def fraction(x: str):
            integer, _, rest = x.partition(".")
            nonrep, _, rep = rest.partition("(")
            rep = rep.rstrip(")")
            base = 10 ** len(nonrep)
            if rep:
                numerator = int(nonrep + rep) - int(nonrep or "0")
                denominator = base * (10 ** len(rep) - 1)
            else:
                numerator = int(nonrep or "0")
                denominator = base
            whole = int(integer)
            if numerator == denominator:
                whole, numerator, denominator = whole + 1, 0, 1
            return whole, numerator, denominator

        whole_s, num_s, den_s = fraction(s)
        whole_t, num_t, den_t = fraction(t)
        return whole_s == whole_t and num_s * den_t == num_t * den_s
