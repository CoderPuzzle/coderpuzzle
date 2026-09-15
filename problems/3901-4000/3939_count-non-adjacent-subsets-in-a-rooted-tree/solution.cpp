#include <vector>

using namespace std;

class Solution {
  public:
    int countValidSubsets(vector<int> &parent, vector<int> &nums, int k) {
        const long long mod = 1000000007;
        int n = (int)parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; ++i)
            children[parent[i]].push_back(i);

        vector<vector<long long>> dp0(n, vector<long long>(k, 0));
        vector<vector<long long>> dp1(n, vector<long long>(k, 0));
        for (int node = n - 1; node >= 0; --node) {
            dp0[node][0] = 1;
            dp1[node][nums[node] % k] = 1;
            for (int child : children[node]) {
                vector<long long> merged0(k, 0), merged1(k, 0);
                for (int r0 = 0; r0 < k; ++r0) {
                    long long value0 = dp0[node][r0];
                    long long value1 = dp1[node][r0];
                    if (value0 == 0 && value1 == 0)
                        continue;
                    for (int r1 = 0; r1 < k; ++r1) {
                        long long childAny = (dp0[child][r1] + dp1[child][r1]) % mod;
                        int residue = (r0 + r1) % k;
                        merged0[residue] = (merged0[residue] + value0 * childAny) % mod;
                        merged1[residue] = (merged1[residue] + value1 * dp0[child][r1]) % mod;
                    }
                }
                dp0[node].swap(merged0);
                dp1[node].swap(merged1);
            }
        }
        return (int)((dp0[0][0] + dp1[0][0] - 1 + mod) % mod);
    }
};
