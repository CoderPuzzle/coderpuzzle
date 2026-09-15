class Solution {

    public long numberOfSubstrings(String s) {
        long[] counts = new long[26];
        long total = 0;
        for (int index = 0; index < s.length(); index++) {
            int character = s.charAt(index) - 'a';
            counts[character]++;
            total += counts[character];
        }
        return total;
    }
}
