class Solution {

    public boolean buddyStrings(String s, String goal) {
        // A swap moves exactly two letters, so it changes two positions of s
        // or, when the letters are equal, nothing at all. Count the positions
        // where s and goal disagree: exactly two that cross, or none with a
        // repeated letter to trade.
        if (s.length() != goal.length()) return false;
        int first = -1,
            second = -1;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != goal.charAt(i)) {
                if (first == -1) first = i;
                else if (second == -1) second = i;
                else return false;
            }
        }
        if (second != -1) {
            return s.charAt(first) == goal.charAt(second) && s.charAt(second) == goal.charAt(first);
        }
        if (first != -1) return false;
        boolean[] seen = new boolean[26];
        for (int i = 0; i < s.length(); i++) {
            int k = s.charAt(i) - 'a';
            if (seen[k]) return true;
            seen[k] = true;
        }
        return false;
    }
}
