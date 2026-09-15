class Solution {

    public int addMinimum(String word) {
        // Two pointers over word and the repeating pattern "abc": every
        // aligned pattern slot the word fails to consume is a letter that
        // must be inserted there.
        int answer = 0;
        int k = 0;
        int i = 0;
        while (k < word.length()) {
            if (word.charAt(k) == "abc".charAt(i % 3)) {
                k++;
            } else {
                answer++;
            }
            i++;
        }
        // After the last consumed letter, finish off its cycle.
        return answer + ((3 - (i % 3)) % 3);
    }
}
