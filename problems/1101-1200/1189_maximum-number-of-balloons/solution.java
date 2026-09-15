class Solution {

    public int maxNumberOfBalloons(String text) {
        int[] counts = new int[26];
        for (int i = 0; i < text.length(); i++) {
            counts[text.charAt(i) - 'a']++;
        }
        // balloon needs b, a, n once and l, o twice; the scarcest letter
        // caps the whole word.
        return Math.min(
            counts['b' - 'a'],
            Math.min(
                counts['a' - 'a'],
                Math.min(counts['n' - 'a'], Math.min(counts['l' - 'a'] / 2, counts['o' - 'a'] / 2))
            )
        );
    }
}
