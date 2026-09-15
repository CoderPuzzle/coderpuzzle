class Solution {

    public boolean isRationalEqual(String s, String t) {
        // Two notations name the same number exactly when their exact
        // rational values coincide. Parse each string into an integer part
        // plus an exact fraction: with a repeating part, the fractional
        // value is (int(nonrep + rep) - int(nonrep)) over
        // 10^len(nonrep) * (10^len(rep) - 1); without one, int(nonrep)
        // over 10^len(nonrep). A numerator equal to the denominator is the
        // all-trailing-9s carry — 0.9(9) is exactly 1 — so it rolls into
        // the integer part. Parts are at most four digits, so numerator
        // and denominator stay below 10^8 and every cross product below
        // 10^16, two orders inside a long.
        long[] a = fraction(s);
        long[] b = fraction(t);
        return a[0] == b[0] && a[1] * b[2] == b[1] * a[2];
    }

    // The value of one notation as {whole, numerator, denominator}, with
    // the trailing-9s carry already folded into the whole part.
    private long[] fraction(String x) {
        String integer = x,
            rest = "";
        int dot = x.indexOf('.');
        if (dot >= 0) {
            integer = x.substring(0, dot);
            rest = x.substring(dot + 1);
        }
        String nonRep = rest,
            rep = "";
        int open = rest.indexOf('(');
        if (open >= 0) {
            nonRep = rest.substring(0, open);
            rep = rest.substring(open + 1, rest.length() - 1);
        }
        long base = pow10(nonRep.length());
        long numerator, denominator;
        if (rep.isEmpty()) {
            numerator = digits(nonRep);
            denominator = base;
        } else {
            numerator = digits(nonRep + rep) - digits(nonRep);
            denominator = base * (pow10(rep.length()) - 1);
        }
        long whole = digits(integer);
        if (numerator == denominator) {
            // 0.9(9) carries into the whole part
            whole++;
            numerator = 0;
            denominator = 1;
        }
        return new long[] { whole, numerator, denominator };
    }

    private long digits(String s) {
        return s.isEmpty() ? 0 : Long.parseLong(s);
    }

    private long pow10(int exponent) {
        long value = 1;
        for (int i = 0; i < exponent; i++) {
            value *= 10;
        }
        return value;
    }
}
