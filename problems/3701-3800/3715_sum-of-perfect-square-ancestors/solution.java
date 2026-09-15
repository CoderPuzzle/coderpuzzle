import java.util.ArrayList;
import java.util.List;

class Solution {

    public long sumOfAncestors(int[] parent, int[] nums) {
        int n = parent.length;
        int maxValue = 0;
        for (int v : nums) {
            maxValue = Math.max(maxValue, v);
        }

        // Smallest-prime-factor sieve up to the largest value present.
        int[] spf = new int[maxValue + 1];
        for (int i = 2; i <= maxValue; ++i) {
            if (spf[i] == 0) {
                for (int j = i; j <= maxValue; j += i) {
                    if (spf[j] == 0) {
                        spf[j] = i;
                    }
                }
            }
        }

        // Square-free kernel: the product of primes dividing the value an
        // odd number of times. Two positive integers multiply to a perfect
        // square exactly when their kernels are equal.
        int[] kernel = new int[n];
        for (int i = 0; i < n; ++i) {
            kernel[i] = 1;
            int v = nums[i];
            while (v > 1) {
                int p = spf[v];
                boolean odd = false;
                while (v % p == 0) {
                    v /= p;
                    odd = !odd;
                }
                if (odd) {
                    kernel[i] *= p;
                }
            }
        }

        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            children.add(new ArrayList<>());
        }
        for (int i = 1; i < n; ++i) {
            children.get(parent[i]).add(i);
        }

        // Iterative depth-first walk; freq[k] counts ancestors on the
        // current root path whose kernel is k. Entering a node first adds
        // its matches, then records its own kernel; the node + n marker
        // undoes the record once the whole subtree is done.
        int[] freq = new int[maxValue + 1];
        long total = 0;
        int[] stack = new int[2 * n + 1];
        int top = 0;
        stack[top++] = 0;
        while (top > 0) {
            int node = stack[--top];
            if (node < n) {
                total += freq[kernel[node]];
                freq[kernel[node]] += 1;
                stack[top++] = node + n;
                for (int child : children.get(node)) {
                    stack[top++] = child;
                }
            } else {
                --freq[kernel[node - n]];
            }
        }
        return total;
    }
}
