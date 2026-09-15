class Solution {

    public int mostWordsFound(String[] sentences) {
        int maximum = 0;
        for (String sentence : sentences) {
            int words = 1;
            for (int index = 0; index < sentence.length(); index++) {
                if (sentence.charAt(index) == ' ') {
                    words++;
                }
            }
            maximum = Math.max(maximum, words);
        }
        return maximum;
    }
}
