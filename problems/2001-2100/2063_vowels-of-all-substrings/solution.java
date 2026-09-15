class Solution {

    public long countVowels(String word) {
        long total = 0;
        for (int index = 0; index < word.length(); index++) {
            if (isVowel(word.charAt(index))) {
                total += (long) (index + 1) * (word.length() - index);
            }
        }
        return total;
    }

    private boolean isVowel(char character) {
        return character == 'a' || character == 'e' || character == 'i' || character == 'o' || character == 'u';
    }
}
