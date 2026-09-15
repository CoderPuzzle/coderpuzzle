class Solution {
  public:
    int reachNumber(int target) {
        // Reversing every move maps a path to target onto a path to
        // -target, so only |target| matters. Walking right for k moves
        // lands on the triangular sum T = k(k+1)/2; flipping move i to the
        // left lowers the total by exactly 2i, so an even overshoot
        // T - |target| is repaired without extra moves while an odd one
        // never is. Take the first k whose T reaches |target| with an even
        // overshoot — advancing k one step adds k+1 to T, flipping parity
        // within at most two steps. Near the 1e9 bound the running sum
        // passes a billion, so the accumulation runs in long long.
        long long t = target < 0 ? -(long long)target : (long long)target;
        long long k = 1;
        long long total = 1;
        while (total < t || (total - t) % 2 != 0) {
            ++k;
            total += k;
        }
        return (int)k;
    }
};
