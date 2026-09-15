class Solution {

    public int minLengthAfterRemovals(String s) {
        // Every operation deletes one 'a' together with one 'b', so the
        // difference between the two counts never changes; while both letters
        // remain some adjacent pair differs, and deleting such pairs one after
        // another boils the string down to exactly that difference.
        int countA = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == 'a') {
                countA++;
            }
        }
        int countB = s.length() - countA;
        return Math.abs(countA - countB);
    }
}
