class Solution {

    public String licenseKeyFormatting(String s, int k) {
        // Dashes are separators, not content: build the cleaned key by
        // dropping them and uppercasing everything that remains.
        StringBuilder key = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch != '-') {
                key.append(Character.toUpperCase(ch));
            }
        }
        int n = key.length();
        if (n == 0) {
            return "";
        }
        // Only the first group may be short, and only when the key length
        // leaves a remainder — otherwise it holds the full k characters.
        int head = n % k == 0 ? k : n % k;
        StringBuilder result = new StringBuilder();
        result.append(key.substring(0, head));
        for (int i = head; i < n; i += k) {
            result.append('-').append(key.substring(i, i + k));
        }
        return result.toString();
    }
}
