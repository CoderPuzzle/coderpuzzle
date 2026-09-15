class Solution {
  public:
    long long sumOfAncestors(vector<int> &parent, vector<int> &nums) {
        int n = parent.size();
        int maxValue = *max_element(nums.begin(), nums.end());

        // Smallest-prime-factor sieve up to the largest value present.
        vector<int> spf(maxValue + 1, 0);
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
        vector<int> kernel(n, 1);
        for (int i = 0; i < n; ++i) {
            int v = nums[i];
            while (v > 1) {
                int p = spf[v];
                bool odd = false;
                while (v % p == 0) {
                    v /= p;
                    odd = !odd;
                }
                if (odd) {
                    kernel[i] *= p;
                }
            }
        }

        vector<vector<int>> children(n);
        for (int i = 1; i < n; ++i) {
            children[parent[i]].push_back(i);
        }

        // Iterative depth-first walk; freq[k] counts ancestors on the
        // current root path whose kernel is k. Entering a node first adds
        // its matches, then records its own kernel; the node + n marker
        // undoes the record once the whole subtree is done.
        vector<long long> freq(maxValue + 1, 0);
        long long total = 0;
        vector<int> stack;
        stack.reserve(2 * n + 1);
        stack.push_back(0);
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            if (node < n) {
                total += freq[kernel[node]];
                freq[kernel[node]] += 1;
                stack.push_back(node + n);
                stack.insert(stack.end(), children[node].begin(), children[node].end());
            } else {
                --freq[kernel[node - n]];
            }
        }
        return total;
    }
};
