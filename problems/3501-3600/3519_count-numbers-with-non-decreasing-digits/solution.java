class Solution {

    private static final long MOD = 1000000007L;

    public int countNumbers(String l, String r, int b) {
        String d = dec(l);
        long below = d == null ? 0 : countUpTo(d, b);
        long ans = (countUpTo(r, b) - below) % MOD;
        ans = ((ans % MOD) + MOD) % MOD;
        return (int) ans;
    }

    private String strip(String s) {
        int i = 0;
        while (i < s.length() - 1 && s.charAt(i) == '0') i++;
        return s.substring(i);
    }

    private String dec(String s) {
        boolean allZero = true;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) != '0') {
                allZero = false;
                break;
            }
        }
        if (allZero) return null;
        char[] c = s.toCharArray();
        int i = c.length - 1;
        while (i >= 0) {
            if (c[i] > '0') {
                c[i]--;
                break;
            }
            c[i] = '9';
            i--;
        }
        return strip(new String(c));
    }

    private int[] toBase(String s, int b) {
        s = strip(s);
        java.util.List<Integer> digits = new java.util.ArrayList<>();
        while (!s.equals("0")) {
            int carry = 0;
            StringBuilder ns = new StringBuilder();
            for (int i = 0; i < s.length(); i++) {
                int v = carry * 10 + (s.charAt(i) - '0');
                ns.append((char) ('0' + v / b));
                carry = v % b;
            }
            digits.add(carry);
            s = strip(ns.toString());
        }
        if (digits.isEmpty()) return new int[] { 0 };
        int[] out = new int[digits.size()];
        for (int i = 0; i < out.length; i++) out[i] = digits.get(out.length - 1 - i);
        return out;
    }

    private long countUpTo(String s, int b) {
        int[] digits = toBase(s, b);
        int m = digits.length;
        // g[pos][last][tight][started]
        long[][][][] g = new long[m + 1][b][2][2];
        for (int last = 0; last < b; last++) for (int tight = 0; tight < 2; tight++) for (
            int started = 0;
            started < 2;
            started++
        ) g[m][last][tight][started] = 1;
        for (int pos = m - 1; pos >= 0; pos--) {
            for (int last = 0; last < b; last++) {
                for (int tight = 0; tight < 2; tight++) {
                    for (int started = 0; started < 2; started++) {
                        int limit = tight == 1 ? digits[pos] : b - 1;
                        long res = 0;
                        for (int d = 0; d <= limit; d++) {
                            int nt = tight == 1 && d == limit ? 1 : 0;
                            if (started == 0) {
                                if (d == 0) res += g[pos + 1][0][nt][0];
                                else res += g[pos + 1][d][nt][1];
                            } else if (d >= last) {
                                res += g[pos + 1][d][nt][1];
                            }
                        }
                        g[pos][last][tight][started] = res % MOD;
                    }
                }
            }
        }
        return g[0][0][1][0];
    }
}
