class Solution {

    public boolean halvesAreAlike(String s) {
        // Only the vowel totals of the two halves matter — which vowel it
        // is, where it sits, and whether it is upper- or lowercase are all
        // irrelevant. One pass with a single counter: +1 for every vowel in
        // the first half, -1 for every vowel in the second; equal totals
        // land the counter back at exactly zero.
        int half = s.length() / 2;
        int balance = 0;
        for (int i = 0; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) {
                balance += i < half ? 1 : -1;
            }
        }
        return balance == 0;
    }

    private boolean isVowel(char c) {
        return (
            c == 'a' ||
            c == 'e' ||
            c == 'i' ||
            c == 'o' ||
            c == 'u' ||
            c == 'A' ||
            c == 'E' ||
            c == 'I' ||
            c == 'O' ||
            c == 'U'
        );
    }
}
