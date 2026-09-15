#include <array>
#include <deque>
#include <string>
#include <vector>

class Solution {
  public:
    // Apply next-permutation k times to get the target digits, then the
    // minimum adjacent swaps to rearrange num into it is the inversion
    // count of the order-preserving digit matching.
    int getMinSwaps(std::string num, int k) {
        int n = num.size();
        std::vector<int> arr(n);
        for (int i = 0; i < n; i++) {
            arr[i] = num[i] - '0';
        }
        for (int t = 0; t < k; t++) {
            nextPermutation(arr);
        }
        std::array<std::deque<int>, 10> slots;
        for (int i = 0; i < n; i++) {
            slots[num[i] - '0'].push_back(i);
        }
        std::vector<int> perm(n);
        for (int i = 0; i < n; i++) {
            perm[i] = slots[arr[i]].front(), slots[arr[i]].pop_front();
        }
        std::vector<long long> tree(n + 1, 0);
        long long inv = 0;
        for (int i = 0; i < n; i++) {
            long long less_eq = 0;
            for (int x = perm[i]; x > 0; x -= x & (-x)) {
                less_eq += tree[x];
            }
            inv += i - less_eq;
            for (int x = perm[i] + 1; x <= n; x += x & (-x)) {
                tree[x]++;
            }
        }
        return (int)inv;
    }

  private:
    void nextPermutation(std::vector<int> &a) {
        int n = a.size(), i = n - 2;
        while (i >= 0 && a[i] >= a[i + 1]) {
            i--;
        }
        int j = n - 1;
        while (a[j] <= a[i]) {
            j--;
        }
        std::swap(a[i], a[j]);
        for (int l = i + 1, r = n - 1; l < r; l++, r--) {
            std::swap(a[l], a[r]);
        }
    }
};
