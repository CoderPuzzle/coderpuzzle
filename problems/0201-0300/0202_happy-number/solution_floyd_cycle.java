class Solution {

    // Sum of the squares of the digits, one digit per iteration.
    private static int step(int m) {
        int total = 0;
        while (m != 0) {
            int digit = m % 10;
            total += digit * digit;
            m /= 10;
        }
        return total;
    }

    public boolean isHappy(int n) {
        // The step is a fixed function of its input, so the sequence from n
        // is a tail leading into the fixed point 1 or into a cycle that
        // avoids it — a rho shape. Tortoise and hare settle which, with no
        // memory of past values: the hare gains one position per round, so
        // once both runners are on the cycle it must catch the tortoise.
        int slow = step(n);
        int fast = step(step(n));
        while (slow != fast) {
            slow = step(slow);
            fast = step(step(fast));
        }
        // Happy starts park both runners on 1, where they are born equal; an
        // unhappy start meets inside a cycle that never contains 1.
        return slow == 1;
    }
}
