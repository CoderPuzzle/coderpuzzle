class Solution {
  public:
    int oddEvenJumps(vector<int> &arr) {
        // The jump out of every index is forced: an odd jump lands on the
        // smallest value >= arr[i] to the right, an even jump on the largest
        // value <= arr[i], and ties go to the smallest index. Build both
        // jump tables with one sort and one stack each: walk the indices
        // ordered by (value, index) — by (negated value, index) for the
        // even table — and each newcomer resolves every still-open index
        // standing to its left, because the first walker with a larger
        // original index is exactly the forced target. Then sweep from the
        // right: odd_ok[i] holds when the odd target's even_ok holds,
        // even_ok[i] when the even target's odd_ok holds, the last index is
        // good under both with zero jumps, and the answer counts the
        // odd_ok starts — every good start opens with an odd jump.
        int n = static_cast<int>(arr.size());
        vector<int> higher = jumpTable(arr, false);
        vector<int> lower = jumpTable(arr, true);
        vector<char> oddOk(n, 0);
        vector<char> evenOk(n, 0);
        oddOk[n - 1] = evenOk[n - 1] = 1;
        int count = 1;
        for (int i = n - 2; i >= 0; --i) {
            int j = higher[i];
            if (j != -1 && evenOk[j]) {
                oddOk[i] = 1;
            }
            j = lower[i];
            if (j != -1 && oddOk[j]) {
                evenOk[i] = 1;
            }
            count += oddOk[i];
        }
        return count;
    }

  private:
    // Stack of indices still waiting for their forced target; the first
    // walker standing further right resolves each of them.
    vector<int> jumpTable(const vector<int> &arr, bool descending) {
        int n = static_cast<int>(arr.size());
        vector<int> order(n);
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (arr[a] != arr[b]) {
                return descending ? arr[b] < arr[a] : arr[a] < arr[b];
            }
            return a < b;
        });
        vector<int> table(n, -1);
        vector<int> stack;
        stack.reserve(n);
        for (int j : order) {
            while (!stack.empty() && stack.back() < j) {
                table[stack.back()] = j;
                stack.pop_back();
            }
            stack.push_back(j);
        }
        return table;
    }
};
