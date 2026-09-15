class Solution {
  public:
    int fib(int n) {
        // Every Fibonacci number is the sum of the two before it, so one walk
        // up from the seeds F(0) = 0 and F(1) = 1 reaches F(n): roll the pair
        // forward and the second variable ends on the answer. Only the last
        // two values ever matter, so nothing is tabulated. F(30) = 832040,
        // comfortably inside int range, so plain 32-bit addition carries the
        // whole domain.
        if (n < 2) {
            return n;
        }
        int previous = 0;
        int current = 1;
        for (int i = 1; i < n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }
        return current;
    }
};
