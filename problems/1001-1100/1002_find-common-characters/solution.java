class Solution {

    public String[] commonChars(String[] words) {
        // Fold every word's 26-length letter-count array into a running
        // element-wise minimum; a letter absent from any single word is
        // pinned to zero from that point on.
        int[] common = new int[26];
        for (int i = 0; i < words.length; i++) {
            int[] counts = new int[26];
            for (char c : words[i].toCharArray()) {
                counts[c - 'a']++;
            }
            if (i == 0) {
                common = counts;
            } else {
                for (int j = 0; j < 26; j++) {
                    common[j] = Math.min(common[j], counts[j]);
                }
            }
        }
        // Reading the surviving counts off from 'a' to 'z' builds the
        // answer directly in ascending alphabetical order.
        int total = 0;
        for (int count : common) {
            total += count;
        }
        String[] result = new String[total];
        int index = 0;
        for (int i = 0; i < 26; i++) {
            for (int k = 0; k < common[i]; k++) {
                result[index++] = String.valueOf((char) ('a' + i));
            }
        }
        return result;
    }
}
