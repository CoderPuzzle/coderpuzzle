class Solution {

    public String clearDigits(String s) {
        // Survivors so far form a stack; a digit always removes the closest
        // non-digit still standing to its left, which is exactly its top.
        StringBuilder kept = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') {
                kept.deleteCharAt(kept.length() - 1);
            } else {
                kept.append(ch);
            }
        }
        return kept.toString();
    }
}
