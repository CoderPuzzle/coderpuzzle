class Solution {

    public String findTheDifference(String s, String t) {
        // Every letter of s reappears somewhere in t, so folding both
        // strings into one XOR accumulator cancels each shuffled pair
        // and leaves only the added letter's code.
        int code = 0;
        for (int i = 0; i < s.length(); i++) {
            code ^= s.charAt(i);
        }
        for (int i = 0; i < t.length(); i++) {
            code ^= t.charAt(i);
        }
        return String.valueOf((char) code);
    }
}
