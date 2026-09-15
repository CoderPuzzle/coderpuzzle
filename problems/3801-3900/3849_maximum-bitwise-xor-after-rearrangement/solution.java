class Solution {

    public String maximumXor(String s, String t) {
        int n = s.length();
        int sOnes = 0;
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                sOnes++;
            }
        }
        int tOnes = 0;
        for (int i = 0; i < n; i++) {
            if (t.charAt(i) == '1') {
                tOnes++;
            }
        }
        // Ones of t that can land on s's '0' positions and zeros of t that
        // can land on s's '1' positions — the largest pair of opposite-bit
        // counts the two multisets allow, maxed together.
        int onesOnZeros = Math.min(tOnes, n - sOnes);
        int zerosOnOnes = Math.min(n - tOnes, sOnes);
        // Greedy left-to-right fill: spend an opposite bit at each position
        // while its class still has one, which pushes every achievable XOR
        // one as far left as it can go.
        StringBuilder result = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '0') {
                if (onesOnZeros > 0) {
                    result.append('1');
                    onesOnZeros--;
                } else {
                    result.append('0');
                }
            } else if (zerosOnOnes > 0) {
                result.append('1');
                zerosOnOnes--;
            } else {
                result.append('0');
            }
        }
        return result.toString();
    }
}
