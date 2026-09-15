class Solution {

    public String kthCharacter(String s, long k) {
        // A word's letter at offset i (0-based) fills i + 1 consecutive slots
        // of t and a space fills exactly one, so walking s while subtracting
        // each character's cost from k lands on the owner without ever
        // materializing t -- at the constraints t can span billions of
        // characters, so building it is hopeless while this scan is linear.
        // The subtraction needs 64 bits: t's largest length is about 5 * 10^9.
        long position = 0; // 0-based offset of the next character within its word
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == ' ') {
                position = 0;
                k -= 1;
            } else {
                position += 1;
                k -= position;
            }
            if (k < 0) {
                return String.valueOf(ch);
            }
        }
        // Unreachable: k always names a valid slot of t.
        return "";
    }
}
