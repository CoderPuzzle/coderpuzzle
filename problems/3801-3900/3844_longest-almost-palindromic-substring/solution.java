class Solution {

    public int almostPalindromic(String s) {
        int n = s.length();

        // These arrays describe intervals of the two preceding lengths.
        // Empty and one-character intervals are palindromes. A one-character
        // interval is also almost-palindromic because deleting it leaves the
        // empty palindrome.
        boolean[] palTwo = new boolean[n + 1];
        boolean[] almostTwo = new boolean[n + 1];
        boolean[] palOne = new boolean[n];
        boolean[] almostOne = new boolean[n];
        java.util.Arrays.fill(palTwo, true);
        java.util.Arrays.fill(palOne, true);
        java.util.Arrays.fill(almostOne, true);
        int best = 1;

        for (int length = 2; length <= n; length++) {
            int count = n - length + 1;
            boolean[] palNow = new boolean[count];
            boolean[] almostNow = new boolean[count];
            for (int left = 0; left < count; left++) {
                int right = left + length - 1;
                boolean sameEnds = s.charAt(left) == s.charAt(right);
                palNow[left] = sameEnds && palTwo[left + 1];

                // Delete the right end, delete the left end, or keep both
                // matching ends and use the deletion inside.
                almostNow[left] = palOne[left] || palOne[left + 1] || (sameEnds && almostTwo[left + 1]);
                if (almostNow[left]) {
                    best = length;
                }
            }

            palTwo = palOne;
            palOne = palNow;
            almostTwo = almostOne;
            almostOne = almostNow;
        }

        return best;
    }
}
