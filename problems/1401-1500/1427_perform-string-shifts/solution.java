class Solution {

    public String stringShift(String s, int[][] shift) {
        int net = 0;
        for (int[] operation : shift) {
            net += operation[0] == 0 ? operation[1] : -operation[1];
        }
        int n = s.length();
        int k = ((net % n) + n) % n;
        return s.substring(k) + s.substring(0, k);
    }
}
