class Solution {

    public int countHousePlacements(int n) {
        final long MOD = 1000000007L;
        long prev = 1;
        long curr = 2;
        for (int i = 1; i < n; i++) {
            long next = (prev + curr) % MOD;
            prev = curr;
            curr = next;
        }
        long answer = (curr * curr) % MOD;
        return (int) answer;
    }
}
