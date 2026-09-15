class Solution {

    public int takeCharacters(String s, int k) {
        // Equivalently: keep the longest middle stretch whose letter counts
        // stay at or under total - k; the ends taken to delete it are then
        // k of each letter or more. Answer = n - that longest window.
        int n = s.length();
        int[] total = new int[3];
        for (int i = 0; i < n; ++i) total[s.charAt(i) - 'a']++;
        if (total[0] < k || total[1] < k || total[2] < k) return -1;
        int[] window = new int[3];
        int left = 0;
        int best = 0;
        for (int right = 0; right < n; ++right) {
            window[s.charAt(right) - 'a']++;
            while (!valid(window, total, k)) {
                window[s.charAt(left) - 'a']--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return n - best;
    }

    private boolean valid(int[] window, int[] total, int k) {
        for (int c = 0; c < 3; ++c) {
            if (window[c] > total[c] - k) return false;
        }
        return true;
    }
}
