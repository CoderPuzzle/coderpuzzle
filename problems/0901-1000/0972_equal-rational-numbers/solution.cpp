class Solution {
  public:
    bool isRationalEqual(string s, string t) {
        // Two notations name the same number exactly when their exact
        // rational values coincide. Parse each string into an integer part
        // plus an exact fraction: with a repeating part, the fractional
        // value is (int(nonrep + rep) - int(nonrep)) over
        // 10^len(nonrep) * (10^len(rep) - 1); without one, int(nonrep)
        // over 10^len(nonrep). A numerator equal to the denominator is the
        // all-trailing-9s carry — 0.9(9) is exactly 1 — so it rolls into
        // the integer part. Parts are at most four digits, so numerator
        // and denominator stay below 10^8 and every cross product below
        // 10^16, two orders inside a long long.
        array<long long, 3> a = fraction(s), b = fraction(t);
        return a[0] == b[0] && a[1] * b[2] == b[1] * a[2];
    }

  private:
    // The value of one notation as {whole, numerator, denominator}, with
    // the trailing-9s carry already folded into the whole part.
    array<long long, 3> fraction(const string &x) {
        size_t dot = x.find('.');
        string integer = dot == string::npos ? x : x.substr(0, dot);
        string rest = dot == string::npos ? "" : x.substr(dot + 1);
        size_t open = rest.find('(');
        string nonRep = open == string::npos ? rest : rest.substr(0, open);
        string rep = open == string::npos ? "" : rest.substr(open + 1, rest.size() - open - 2);
        long long base = pow10(nonRep.size());
        long long numerator, denominator;
        if (rep.empty()) {
            numerator = digits(nonRep);
            denominator = base;
        } else {
            numerator = digits(nonRep + rep) - digits(nonRep);
            denominator = base * (pow10(rep.size()) - 1);
        }
        long long whole = digits(integer);
        if (numerator == denominator) { // 0.9(9) carries into the whole part
            whole++;
            numerator = 0;
            denominator = 1;
        }
        return {whole, numerator, denominator};
    }

    long long digits(const string &s) { return s.empty() ? 0 : stoll(s); }

    long long pow10(int exponent) {
        long long value = 1;
        for (int i = 0; i < exponent; ++i)
            value *= 10;
        return value;
    }
};
