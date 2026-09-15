class Solution {

    public String finalString(String s) {
        // Type characters into one growing buffer: letters append, and each
        // 'i' reverses everything typed so far. After the last keystroke the
        // buffer is exactly the laptop screen.
        StringBuilder screen = new StringBuilder();
        for (int k = 0; k < s.length(); k++) {
            char c = s.charAt(k);
            if (c == 'i') {
                screen.reverse();
            } else {
                screen.append(c);
            }
        }
        return screen.toString();
    }
}
