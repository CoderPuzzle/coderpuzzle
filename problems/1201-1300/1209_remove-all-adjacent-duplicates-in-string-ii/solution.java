class Solution {

    public String removeDuplicates(String s, int k) {
        StringBuilder chars = new StringBuilder();
        StringBuilder counts = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            int len = chars.length();
            if (len > 0 && chars.charAt(len - 1) == ch) {
                int cnt = counts.charAt(len - 1) + 1;
                if (cnt == k) {
                    chars.deleteCharAt(len - 1);
                    counts.deleteCharAt(len - 1);
                } else {
                    counts.setCharAt(len - 1, (char) cnt);
                }
            } else {
                chars.append(ch);
                counts.append((char) 1);
            }
        }
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < chars.length(); i++) {
            char ch = chars.charAt(i);
            int count = counts.charAt(i);
            for (int c = 0; c < count; c++) {
                out.append(ch);
            }
        }
        return out.toString();
    }
}
