class Solution {

    public long maximumSubsequenceCount(String text, String pattern) {
        // An inserted pattern[0] pairs with the most pattern[1]'s at the
        // very front of text, and an inserted pattern[1] with the most
        // pattern[0]'s at the very end — any interior spot sees only a
        // subset of one of those sides. So the answer is the pairs already
        // in text plus the larger of the two letter counts, and one sweep
        // gathers all three numbers: each pattern[1] is charged with the
        // pattern[0]'s before it. When both pattern letters are equal the
        // same sweep yields k*(k-1)/2 pairs plus a gain of k, which is
        // exactly what one extra copy of that letter adds.
        char first = pattern.charAt(0),
            second = pattern.charAt(1);
        long countFirst = 0,
            countSecond = 0,
            pairs = 0;
        for (int i = 0; i < text.length(); ++i) {
            char ch = text.charAt(i);
            if (ch == second) {
                pairs += countFirst;
                countSecond++;
            }
            if (ch == first) {
                countFirst++;
            }
        }
        return pairs + Math.max(countFirst, countSecond);
    }
}
