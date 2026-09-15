class Solution {

    // present[0..25] = lowercase seen, present[26..51] = uppercase seen.
    public String greatestLetter(String s) {
        boolean[] present = new boolean[52];
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 'a') {
                present[c - 'a'] = true;
            } else {
                present[26 + c - 'A'] = true;
            }
        }
        for (int i = 25; i >= 0; i--) {
            if (present[i] && present[26 + i]) {
                return String.valueOf((char) ('A' + i));
            }
        }
        return "";
    }
}
