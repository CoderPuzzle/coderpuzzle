class Solution {

    public String nearestPalindromic(String n) {
        // A palindrome is fixed by its first half, so the palindromes
        // nearest n nearly share n's own half: mirror the half, and the
        // half +/- 1, for at most three same-width candidates. The +/- 1
        // step can leave the width (10...0 decremented, 9...9 incremented);
        // those neighbors are the boundary candidates 10^(L-1) - 1 (all 9s,
        // one digit shorter) and 10^L + 1 (1, zeros, 1).
        int length = n.length();
        int half = (length + 1) / 2;
        long prefix = Long.parseLong(n.substring(0, half));
        String[] candidates = new String[5];
        int count = 0;
        for (int delta = -1; delta <= 1; delta++) {
            String shifted = Long.toString(prefix + delta);
            // A half that no longer has exactly `half` digits would mirror
            // onto leading zeros - the boundary candidates own that ground.
            if (shifted.length() != half || (shifted.equals("0") && length > 1)) {
                continue;
            }
            String head = new StringBuilder(shifted.substring(0, length - half)).reverse().toString();
            candidates[count++] = shifted + head;
        }
        candidates[count++] = length == 1 ? "0" : "9".repeat(length - 1);
        candidates[count++] = "1" + "0".repeat(length - 1) + "1";

        // Everything fits a signed 64-bit integer: n is below 10^18, the
        // widest candidate is 10^18 + 1, and no distance passes
        // 9 * 10^17 + 1 - an order of magnitude inside long's
        // 9.22 * 10^18 ceiling.
        long value = Long.parseLong(n);
        String best = null;
        long bestValue = 0;
        long bestDistance = 0;
        for (int i = 0; i < count; i++) {
            long candidateValue = Long.parseLong(candidates[i]);
            if (candidateValue == value) {
                continue; // n itself never counts
            }
            long distance = Math.abs(candidateValue - value);
            if (best == null || distance < bestDistance || (distance == bestDistance && candidateValue < bestValue)) {
                best = candidates[i];
                bestValue = candidateValue;
                bestDistance = distance;
            }
        }
        return best;
    }
}
