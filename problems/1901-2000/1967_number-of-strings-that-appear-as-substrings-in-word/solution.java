class Solution {

    public int numOfStrings(String[] patterns, String word) {
        // Each pattern is judged on its own: count the ones that occur as
        // a contiguous substring of word.
        int count = 0;
        for (String pattern : patterns) {
            if (word.contains(pattern)) {
                ++count;
            }
        }
        return count;
    }
}
