class Solution {

    public boolean isValid(String word) {
        // One scan: reject any character outside digits/letters while
        // tracking whether a vowel and a consonant were both seen.
        if (word.length() < 3) {
            return false;
        }
        String vowels = "aeiou";
        boolean hasVowel = false;
        boolean hasConsonant = false;
        for (char ch : word.toCharArray()) {
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                if (vowels.indexOf(Character.toLowerCase(ch)) >= 0) {
                    hasVowel = true;
                } else {
                    hasConsonant = true;
                }
            } else if (ch >= '0' && ch <= '9') {
                continue;
            } else {
                return false;
            }
        }
        return hasVowel && hasConsonant;
    }
}
