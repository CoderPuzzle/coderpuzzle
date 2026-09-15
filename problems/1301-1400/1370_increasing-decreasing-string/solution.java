class Solution {

    public String sortString(String s) {
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) counts[s.charAt(i) - 'a'] += 1;
        int remaining = s.length();
        StringBuilder sb = new StringBuilder();
        boolean forward = true;
        while (remaining > 0) {
            for (int k = 0; k < 26; k++) {
                int i = forward ? k : 25 - k;
                if (counts[i] > 0) {
                    counts[i] -= 1;
                    remaining -= 1;
                    sb.append((char) ('a' + i));
                }
            }
            forward = !forward;
        }
        return sb.toString();
    }
}
