class Solution {

    public int findIntegers(int n) {
        String s = Integer.toBinaryString(n);
        int m = s.length();
        // fib[i] = number of binary strings of length i with no consecutive 1s
        long[] fib = new long[m + 2];
        fib[0] = 1;
        fib[1] = 2;
        for (int i = 2; i <= m; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        long res = 0;
        for (int i = 0; i < m; i++) {
            if (s.charAt(i) == '1') {
                // place 0 here, suffix can be anything without consecutive ones
                res += fib[m - i - 1];
                if (i > 0 && s.charAt(i - 1) == '1') {
                    // n itself already contains consecutive ones; stop counting
                    return (int) res;
                }
            }
        }
        return (int) (res + 1); // count n itself (its binary has no consecutive ones)
    }
}
