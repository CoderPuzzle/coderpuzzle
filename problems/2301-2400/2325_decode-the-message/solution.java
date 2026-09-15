class Solution {

    public String decodeMessage(String key, String message) {
        // First appearances in key fill the substitution table in order,
        // each new letter taking the next alphabet letter; spaces map to
        // spaces, then message is translated through the table.
        StringBuilder out = new StringBuilder(message.length());
        char[] table = new char[26];
        char next = 'a';
        for (int i = 0; i < key.length(); i++) {
            char ch = key.charAt(i);
            if (ch != ' ' && table[ch - 'a'] == 0) {
                table[ch - 'a'] = next++;
            }
        }
        for (int i = 0; i < message.length(); i++) {
            char ch = message.charAt(i);
            out.append(ch == ' ' ? ' ' : table[ch - 'a']);
        }
        return out.toString();
    }
}
