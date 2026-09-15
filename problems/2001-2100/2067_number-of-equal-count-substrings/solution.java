class Solution {

    public int equalCountSubstrings(String s, int count) {
        int answer = 0;
        for (int distinct = 1; distinct <= 26; ++distinct) {
            int windowLength = distinct * count;
            if (windowLength > s.length()) break;
            int[] frequencies = new int[26];
            int present = 0;
            int exact = 0;

            for (int right = 0; right < s.length(); ++right) {
                int index = s.charAt(right) - 'a';
                if (frequencies[index] == 0) present++;
                if (frequencies[index] == count) exact--;
                frequencies[index]++;
                if (frequencies[index] == count) exact++;

                if (right >= windowLength) {
                    index = s.charAt(right - windowLength) - 'a';
                    if (frequencies[index] == count) exact--;
                    frequencies[index]--;
                    if (frequencies[index] == count) exact++;
                    if (frequencies[index] == 0) present--;
                }
                if (right + 1 >= windowLength && present == distinct && exact == distinct) answer++;
            }
        }
        return answer;
    }
}
