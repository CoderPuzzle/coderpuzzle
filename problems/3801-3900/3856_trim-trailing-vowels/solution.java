class Solution {

    public String trimTrailingVowels(String s) {
        int end = s.length();
        while (end > 0 && isVowel(s.charAt(end - 1))) {
            end--;
        }
        return s.substring(0, end);
    }

    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
