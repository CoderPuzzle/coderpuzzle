class Solution {

    public int characterReplacement(String s, int k) {
        // A window is fixable with k changes iff length - (count of its most
        // frequent char) <= k: the non-majority chars are what get replaced.
        int[] count = new int[128];
        int best = 0,
            left = 0,
            maxFreq = 0;
        for (int right = 0; right < s.length(); right++) {
            int c = s.charAt(right);
            // maxFreq is only raised, never lowered: a stale high value can
            // merely under-shrink, and each new longest window really
            // contains the char that set it, so validity is preserved.
            if (++count[c] > maxFreq) maxFreq = count[c];
            // Shrink from the left until the window fits the budget again.
            while (right - left + 1 - maxFreq > k) {
                count[s.charAt(left)]--;
                left++;
            }
            if (right - left + 1 > best) best = right - left + 1;
        }
        return best;
    }
}
