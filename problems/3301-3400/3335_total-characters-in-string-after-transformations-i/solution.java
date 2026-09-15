class Solution {

    public int lengthAfterTransformations(String s, int t) {
        // Only the per-letter counts matter. One transformation shifts the
        // 26-vector one letter up (each of b..z receives its predecessor's
        // count) and splits every z into an a and a b: after the shift the
        // new counts[0] is the old z-count, and the old a-count gains the
        // old z-count on top. Reducing counts[1] below MOD per sweep keeps
        // every entry below MOD forever: a sweep's entries stay below
        // 2 * MOD < 2^31, but the 26-bucket total reaches ~2.7 * 10^10,
        // so the final sum accumulates in a long.
        final int MOD = 1_000_000_007;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a'] += 1;
        }
        for (int step = 0; step < t; ++step) {
            int z = counts[25];
            for (int j = 25; j >= 1; --j) {
                counts[j] = counts[j - 1];
            }
            counts[0] = z;
            counts[1] = (counts[1] + z) % MOD;
        }
        long total = 0;
        for (int j = 0; j < 26; ++j) {
            total += counts[j];
        }
        return (int) (total % MOD);
    }
}
