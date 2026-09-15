import java.util.Arrays;

class Solution {

    public int numberOfSpecialChars(String word) {
        // Special means every lowercase occurrence sits before the first
        // uppercase one, i.e. last-lower index < first-upper index; both
        // positions per letter are captured in a single pass.
        int[] firstUpper = new int[26];
        int[] lastLower = new int[26];
        Arrays.fill(firstUpper, -1);
        Arrays.fill(lastLower, -1);
        for (int position = 0; position < word.length(); position++) {
            char ch = word.charAt(position);
            if (ch >= 'a') {
                lastLower[ch - 'a'] = position;
            } else if (firstUpper[ch - 'A'] == -1) {
                firstUpper[ch - 'A'] = position;
            }
        }
        int count = 0;
        for (int k = 0; k < 26; k++) {
            if (firstUpper[k] != -1 && lastLower[k] != -1 && lastLower[k] < firstUpper[k]) {
                count++;
            }
        }
        return count;
    }
}
