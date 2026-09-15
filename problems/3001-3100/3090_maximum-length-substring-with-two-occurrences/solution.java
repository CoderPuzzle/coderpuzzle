class Solution {

    public int maximumLengthSubstring(String s) {
        // Slide a window over s while tracking one count per letter: grow on
        // the right each step, then shrink from the left only while the
        // freshly added letter would exceed its budget of two occurrences.
        int[] counts = new int[26];
        int best = 0;
        int left = 0;
        for (int right = 0; right < s.length(); ++right) {
            int index = s.charAt(right) - 'a';
            ++counts[index];
            // Only the just-extended letter can be over budget, so the
            // window never has to shrink past its first offender.
            while (counts[index] > 2) {
                --counts[s.charAt(left) - 'a'];
                ++left;
            }
            if (right - left + 1 > best) {
                best = right - left + 1;
            }
        }
        return best;
    }
}
