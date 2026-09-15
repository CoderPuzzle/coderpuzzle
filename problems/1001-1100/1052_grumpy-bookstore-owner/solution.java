class Solution {

    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int base = 0;
        for (int i = 0; i < customers.length; i++) {
            if (grumpy[i] == 0) {
                base += customers[i];
            }
        }

        int window = 0;
        for (int i = 0; i < minutes; i++) {
            if (grumpy[i] == 1) {
                window += customers[i];
            }
        }
        int best = window;
        for (int i = minutes; i < customers.length; i++) {
            if (grumpy[i] == 1) {
                window += customers[i];
            }
            if (grumpy[i - minutes] == 1) {
                window -= customers[i - minutes];
            }
            best = Math.max(best, window);
        }

        return base + best;
    }
}
