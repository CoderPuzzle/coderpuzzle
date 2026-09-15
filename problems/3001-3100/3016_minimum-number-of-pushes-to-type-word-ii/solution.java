import java.util.Arrays;

class Solution {

    public int minimumPushes(String word) {
        int[] counts = new int[26];
        for (int index = 0; index < word.length(); index++) {
            counts[word.charAt(index) - 'a']++;
        }
        Arrays.sort(counts);
        int answer = 0;
        for (int rank = 0; rank < 26; rank++) {
            answer += counts[25 - rank] * (rank / 8 + 1);
        }
        return answer;
    }
}
