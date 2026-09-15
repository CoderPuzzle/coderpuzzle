class Solution {

    public String convertToTitle(int columnNumber) {
        // Bijective base-26: letters are digits 1..26 with no zero, so every
        // step subtracts one before dividing; the off-by-one is the whole problem.
        StringBuilder letters = new StringBuilder();
        while (columnNumber > 0) {
            // Map 1..26 onto 0..25, borrowing one from the next letter up.
            columnNumber--;
            letters.append((char) ('A' + (columnNumber % 26)));
            columnNumber /= 26;
        }
        // Remainders arrive least-significant letter first.
        return letters.reverse().toString();
    }
}
