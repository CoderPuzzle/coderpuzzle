class Solution {

    public boolean digitCount(String num) {
        // One counting pass fills a fixed ten-slot tally; every index then
        // checks the tally against the digit recorded there.
        int[] counts = new int[10];
        for (int index = 0; index < num.length(); index++) {
            counts[num.charAt(index) - '0']++;
        }
        for (int i = 0; i < num.length(); i++) {
            if (counts[i] != num.charAt(i) - '0') return false;
        }
        return true;
    }
}
