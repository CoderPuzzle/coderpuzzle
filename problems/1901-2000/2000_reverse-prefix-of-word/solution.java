class Solution {

    public String reversePrefix(String word, String ch) {
        // Find the first occurrence of ch; if it is absent the word is
        // returned unchanged. Otherwise flip word[0..i] and keep the
        // rest of the string in order.
        int i = word.indexOf(ch);
        if (i == -1) {
            return word;
        }
        return new StringBuilder(word.substring(0, i + 1))
            .reverse()
            .append(word.substring(i + 1))
            .toString();
    }
}
