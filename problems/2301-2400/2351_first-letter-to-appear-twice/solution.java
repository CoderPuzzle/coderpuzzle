class Solution {

    // The first letter to appear twice is exactly the first letter whose
    // second occurrence shows up, so one left-to-right scan with a seen
    // table ends the moment a repeat is met.
    public String repeatedCharacter(String s) {
        boolean[] seen = new boolean[26];
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (seen[ch - 'a']) {
                return String.valueOf(ch);
            }
            seen[ch - 'a'] = true;
        }
        return "";
    }
}
