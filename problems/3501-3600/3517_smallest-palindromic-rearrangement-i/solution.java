class Solution {

    public String smallestPalindrome(String s) {
        // A palindrome is (half) + (odd char, at most one) + reverse(half),
        // and the half's multiset is forced: exactly count[c] // 2 of each
        // letter. So the smallest palindrome is the sorted half, mirrored.
        int[] counts = new int[26];
        for (char ch : s.toCharArray()) {
            counts[ch - 'a'] += 1;
        }
        StringBuilder half = new StringBuilder();
        String middle = "";
        for (int i = 0; i < 26; ++i) {
            for (int rep = 0; rep < counts[i] / 2; ++rep) {
                half.append((char) ('a' + i));
            }
            if (counts[i] % 2 == 1) {
                middle = String.valueOf((char) ('a' + i));
            }
        }
        return half.toString() + middle + half.reverse().toString();
    }
}
