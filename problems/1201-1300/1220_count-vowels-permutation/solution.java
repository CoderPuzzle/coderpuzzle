class Solution {

    public int countVowelPermutation(int n) {
        final int MOD = 1000000007;
        // one counter per vowel: counts of length-L strings ending in that
        // vowel — only the last character constrains the next one
        long a = 1,
            e = 1,
            i = 1,
            o = 1,
            u = 1;
        for (int t = 0; t < n - 1; t++) {
            // follower rules: a<-e,i,u; e<-a,i; i<-e,o; o<-i; u<-i,o.
            // All five are computed from the old values before any is
            // assigned, so no partially updated state leaks into the step;
            // the mod keeps the exponentially growing counts bounded
            long na = (e + i + u) % MOD;
            long ne = (a + i) % MOD;
            long ni = (e + o) % MOD;
            long no = i;
            long nu = (i + o) % MOD;
            a = na;
            e = ne;
            i = ni;
            o = no;
            u = nu;
        }
        // n = 1 never enters the loop and sums the initial five 1s
        return (int) ((a + e + i + o + u) % MOD);
    }
}
