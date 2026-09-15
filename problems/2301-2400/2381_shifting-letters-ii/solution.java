class Solution {

    public String shiftingLetters(String s, int[][] shifts) {
        int n = s.length();
        // Shifts commute, so only the net shift per position matters.
        // Extra slot at n keeps every end+1 marker in bounds.
        int[] diff = new int[n + 1];
        for (int[] sh : shifts) {
            int delta = sh[2] == 1 ? 1 : -1;
            // +delta at start, -delta just past end: an O(1) range update.
            diff[sh[0]] += delta;
            diff[sh[1] + 1] -= delta;
        }
        StringBuilder sb = new StringBuilder(n);
        int shift = 0;
        for (int i = 0; i < n; i++) {
            // Prefix sum yields the net shift; double % keeps it in [0, 26)
            // even when negative (backward shifts, wrap before 'a').
            shift += diff[i];
            int c = (((s.charAt(i) - 'a' + shift) % 26) + 26) % 26;
            sb.append((char) ('a' + c));
        }
        return sb.toString();
    }
}
