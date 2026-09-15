class Solution {

    // Pool all letters; n equal strings need each count % n == 0.
    public boolean makeEqual(String[] words) {
        int n = words.length;
        int[] counts = new int[26];
        for (String w : words) {
            for (int i = 0; i < w.length(); i++) {
                counts[w.charAt(i) - 'a']++;
            }
        }
        for (int c : counts) {
            if (c % n != 0) {
                return false;
            }
        }
        return true;
    }
}
