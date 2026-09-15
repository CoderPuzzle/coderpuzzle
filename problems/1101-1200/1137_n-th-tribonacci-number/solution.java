class Solution {

    public int tribonacci(int n) {
        if (n == 0) return 0;
        // Window of (T0, T1, T2); each step advances it by one term.
        int a = 0,
            b = 1,
            c = 1;
        for (int i = 0; i < n - 2; ++i) {
            int next = a + b + c;
            a = b;
            b = c;
            c = next;
        }
        return c;
    }
}
