class Solution {

    public String findValidPair(String s) {
        // A digit's validity never depends on where it sits, only on how
        // often it occurs in the whole string, so one counting pass settles
        // every question the scan will ask.
        int[] counts = new int[10];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - '0']++;
        }
        for (int i = 0; i + 1 < s.length(); ++i) {
            int a = s.charAt(i) - '0';
            int b = s.charAt(i + 1) - '0';
            // Valid when the digits differ and each occurs exactly as many
            // times as its numeric value.
            if (a != b && counts[a] == a && counts[b] == b) {
                return s.substring(i, i + 2);
            }
        }
        return "";
    }
}
