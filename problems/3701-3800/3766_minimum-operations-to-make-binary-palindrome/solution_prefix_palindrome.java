class Solution {

    public int[] minOperations(int[] nums) {
        int[] answer = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            answer[i] = distance(nums[i]);
        }
        return answer;
    }

    // A binary palindrome is completely determined by its first half of
    // bits: mirror that half around the middle and the whole string is
    // fixed. So every candidate nearest palindrome is one of: the mirrors
    // of the value's own first half and the halves one step below/above
    // it, plus the two length-boundary forms.
    private int distance(int value) {
        int length = 32 - Integer.numberOfLeadingZeros(value);
        int halfLen = (length + 1) / 2;
        int head = value >>> (length - halfLen);
        int best = -1;
        for (int h = head - 1; h <= head + 1; h++) {
            if (h >> (halfLen - 1) == 0) {
                continue; // would lose its leading one — not a b-bit head
            }
            int d = Math.abs(value - mirror(h, halfLen, length));
            if (best < 0 || d < best) {
                best = d;
            }
        }
        for (int boundary : new int[] { (1 << (length - 1)) - 1, (1 << length) + 1 }) {
            int d = Math.abs(value - boundary);
            if (d < best) {
                best = d;
            }
        }
        return best;
    }

    // Build the full palindrome from its first half of bits: emit the half
    // MSB-first, then append the mirrored tail — every bit except the
    // shared center for odd lengths (bit 0 of the half), all bits for even
    // lengths.
    private int mirror(int head, int halfLen, int length) {
        int full = 0;
        for (int i = halfLen - 1; i >= 0; i--) {
            full = full * 2 + ((head >> i) & 1);
        }
        for (int i = length % 2 == 0 ? 0 : 1; i < halfLen; i++) {
            full = full * 2 + ((head >> i) & 1);
        }
        return full;
    }
}
