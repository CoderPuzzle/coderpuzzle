class Solution {
  public:
    string gcdOfStrings(string str1, string str2) {
        // A common divisor string can only exist if the two strings agree
        // on their concatenation order; that is exactly the algebraic
        // signature of both being built from repetitions of one string.
        if (str1 + str2 != str2 + str1) {
            return "";
        }
        // The largest such divisor is the prefix whose length is the GCD
        // of the two string lengths, found via the Euclidean algorithm.
        int a = str1.size();
        int b = str2.size();
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return str1.substr(0, a);
    }
};
