class Solution {

    public String gcdOfStrings(String str1, String str2) {
        // A common divisor string can only exist if the two strings agree
        // on their concatenation order; that is exactly the algebraic
        // signature of both being built from repetitions of one string.
        if (!(str1 + str2).equals(str2 + str1)) {
            return "";
        }
        // The largest such divisor is the prefix whose length is the GCD
        // of the two string lengths, found via the Euclidean algorithm.
        int a = str1.length();
        int b = str2.length();
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return str1.substring(0, a);
    }
}
