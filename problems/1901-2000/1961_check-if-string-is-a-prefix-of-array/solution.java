class Solution {

    public boolean isPrefixString(String s, String[] words) {
        // Match each word in order against the front of s: a prefix string is
        // exactly the concatenation of some first-k words, so once s is fully
        // consumed by exact word matches it must be one.
        int i = 0;
        for (String word : words) {
            if (!s.startsWith(word, i)) return false;
            i += word.length();
            if (i == s.length()) return true;
        }
        return false;
    }
}
