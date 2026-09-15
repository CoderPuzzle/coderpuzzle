class Solution {

    public int minOperations(String s1, String s2) {
        int selectedEdges = 0;
        boolean coveredByPrevious = false;
        int onesDifference = 0;

        for (int i = 0; i < s1.length(); i++) {
            if (s2.charAt(i) == '1') {
                onesDifference++;
            }
            if (s1.charAt(i) == '1') {
                onesDifference--;
            }

            boolean needsPair = s1.charAt(i) == '1' && s2.charAt(i) == '0';
            if (needsPair && !coveredByPrevious) {
                if (s1.length() == 1) {
                    return -1;
                }
                selectedEdges++;
                coveredByPrevious = i + 1 < s1.length();
            } else {
                coveredByPrevious = false;
            }
        }

        return onesDifference + 3 * selectedEdges;
    }
}
