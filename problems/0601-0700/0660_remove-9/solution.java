class Solution {

    public long newInteger(int n) {
        // The 9-free sequence is the base-9 numerals re-read as decimal:
        // counting in base 9 uses only the digits 0-8, so it skips exactly
        // the integers whose decimal spelling contains a 9 — the nth
        // survivor is n written in base 9. Emit digits least significant
        // first (n % 9, then n / 9) and lay them at rising powers of 10.
        long remaining = n;
        long answer = 0;
        long place = 1;
        while (remaining > 0) {
            answer += (remaining % 9) * place;
            remaining /= 9;
            place *= 10;
        }
        return answer;
    }
}
