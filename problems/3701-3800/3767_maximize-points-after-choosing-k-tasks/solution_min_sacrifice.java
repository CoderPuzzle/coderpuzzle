import java.util.Arrays;

class Solution {

    public long maxPoints(int[] technique1, int[] technique2, int k) {
        // Start from the best-of-both baseline: each task pays its larger
        // value. Tasks where technique 1 already wins count toward the
        // quota for free; every task where technique 2 wins must pay back
        // its win (technique2[i] - technique1[i]) whenever the free count
        // falls short of k, and paying back the smallest losses first is
        // plainly optimal. No sort of the whole array is needed.
        long base = 0;
        long[] losses = new long[technique1.length];
        int count = 0;
        int free = 0;
        for (int i = 0; i < technique1.length; ++i) {
            if (technique1[i] >= technique2[i]) {
                base += technique1[i];
                ++free;
            } else {
                base += technique2[i];
                losses[count++] = (long) technique2[i] - technique1[i];
            }
        }
        int forced = k - free;
        if (forced > 0) {
            Arrays.sort(losses, 0, count);
            for (int i = 0; i < forced; ++i) {
                base -= losses[i];
            }
        }
        return base;
    }
}
