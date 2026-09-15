class Solution {

    public String removeStars(String s) {
        // A star deletes the most recently kept character, so keep a
        // stack of survivors: push letters, pop on stars.
        StringBuilder kept = new StringBuilder(s.length());
        for (int i = 0; i < s.length(); ++i) {
            char c = s.charAt(i);
            if (c == '*') {
                kept.setLength(kept.length() - 1);
            } else {
                kept.append(c);
            }
        }
        return kept.toString();
    }
}
