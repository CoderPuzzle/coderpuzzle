class Solution {

    public String shortestBeautifulSubstring(String s, int k) {
        // For a fixed left end i, extending right until the window first
        // holds exactly k ones yields the only shortest beautiful candidate
        // that starts at i: any earlier cut has fewer ones, and any later
        // cut with k ones is strictly longer.
        int n = s.length();
        String best = "";
        for (int i = 0; i < n; ++i) {
            int ones = 0;
            for (int j = i; j < n; ++j) {
                if (s.charAt(j) == '1') ones += 1;
                if (ones == k) {
                    String candidate = s.substring(i, j + 1);
                    if (best.isEmpty() || candidate.length() < best.length()) {
                        best = candidate;
                    } else if (candidate.length() == best.length() && candidate.compareTo(best) < 0) {
                        best = candidate;
                    }
                    break;
                }
            }
        }
        return best;
    }
}
