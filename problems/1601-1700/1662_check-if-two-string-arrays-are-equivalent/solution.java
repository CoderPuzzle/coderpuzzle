class Solution {

    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {
        // Walk both arrays with an array index plus an offset inside the
        // current element: the two concatenated streams are compared one
        // character at a time, never materialized.
        int array1 = 0;
        int offset1 = 0;
        int array2 = 0;
        int offset2 = 0;
        while (array1 < word1.length && array2 < word2.length) {
            if (word1[array1].charAt(offset1) != word2[array2].charAt(offset2)) {
                return false;
            }
            if (++offset1 == word1[array1].length()) {
                ++array1;
                offset1 = 0;
            }
            if (++offset2 == word2[array2].length()) {
                ++array2;
                offset2 = 0;
            }
        }
        // Equal only if both walks exhausted together: an unfinished array
        // means its concatenation is strictly longer.
        return array1 == word1.length && array2 == word2.length;
    }
}
