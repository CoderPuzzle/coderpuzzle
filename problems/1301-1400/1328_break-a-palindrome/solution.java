class Solution {

    public String breakPalindrome(String palindrome) {
        // One change in the first half decides lexicographic order; lower the
        // first non-'a' there to 'a'. All-'a' halves force the last spot to
        // 'b'; length 1 can never stop being a palindrome.
        int n = palindrome.length();
        if (n == 1) {
            return "";
        }
        char[] text = palindrome.toCharArray();
        for (int i = 0; i < n / 2; ++i) {
            if (text[i] != 'a') {
                text[i] = 'a';
                return new String(text);
            }
        }
        text[n - 1] = 'b';
        return new String(text);
    }
}
