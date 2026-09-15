import java.util.Arrays;

class Solution {

    public boolean checkInclusion(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        // No window of length m can exist inside a shorter s2.
        if (m > n) {
            return false;
        }
        int[] need = new int[26];
        int[] window = new int[26];
        for (int i = 0; i < m; i++) {
            need[s1.charAt(i) - 'a']++;
            window[s2.charAt(i) - 'a']++;
        }
        // Matching frequency vectors means the window is a permutation of s1.
        if (Arrays.equals(need, window)) {
            return true;
        }
        for (int i = m; i < n; i++) {
            // Slide one position: add the entering char, drop the leaving one.
            window[s2.charAt(i) - 'a']++;
            window[s2.charAt(i - m) - 'a']--;
            if (Arrays.equals(need, window)) {
                return true;
            }
        }
        return false;
    }
}
