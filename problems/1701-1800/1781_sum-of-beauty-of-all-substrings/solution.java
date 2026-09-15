class Solution {

    public int beautySum(String s) {
        // For each start, grow the substring one character at a time and
        // read every prefix's beauty straight off a running count array:
        // max frequency minus min nonzero frequency.
        int total = 0;
        int n = s.length();
        for (int i = 0; i < n; i++) {
            int[] counts = new int[26];
            for (int j = i; j < n; j++) {
                counts[s.charAt(j) - 'a']++;
                int best = 0;
                int least = n;
                for (int c : counts) {
                    if (c > best) {
                        best = c;
                    }
                    if (c > 0 && c < least) {
                        least = c;
                    }
                }
                total += best - least;
            }
        }
        return total;
    }
}
