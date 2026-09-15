class Solution {

    public int maximumValue(String[] strs) {
        // Digits-only strings count as their base-10 numeric value
        // (leading zeros fold away in the parse); everything else counts
        // by length. Nine digits stay inside int's range.
        int best = 0;
        for (String s : strs) {
            boolean digitsOnly = true;
            for (int i = 0; i < s.length(); ++i) {
                char c = s.charAt(i);
                if (c < '0' || c > '9') {
                    digitsOnly = false;
                    break;
                }
            }
            int value = digitsOnly ? Integer.parseInt(s) : s.length();
            best = Math.max(best, value);
        }
        return best;
    }
}
