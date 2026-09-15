class Solution {

    public int countValidWords(String sentence) {
        int validWords = 0;
        for (String token : sentence.trim().split("\\s+")) {
            if (isValid(token)) {
                validWords++;
            }
        }
        return validWords;
    }

    private boolean isValid(String token) {
        int hyphens = 0;
        int punctuation = 0;

        for (int index = 0; index < token.length(); index++) {
            char character = token.charAt(index);
            if (character >= 'a' && character <= 'z') {
                continue;
            }
            if (character == '-') {
                hyphens++;
                if (
                    hyphens > 1 ||
                    index == 0 ||
                    index + 1 == token.length() ||
                    !isLetter(token.charAt(index - 1)) ||
                    !isLetter(token.charAt(index + 1))
                ) {
                    return false;
                }
            } else if (character == '!' || character == '.' || character == ',') {
                punctuation++;
                if (punctuation > 1 || index + 1 != token.length()) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    private boolean isLetter(char character) {
        return character >= 'a' && character <= 'z';
    }
}
