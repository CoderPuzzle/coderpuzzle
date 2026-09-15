class Solution {
  public:
    bool gcdSort(vector<int> &nums) {
        const int MX = 100001;
        // Smallest-prime-factor sieve: spf[v] lets each value be split into
        // its distinct primes by repeated division.
        vector<int> spf(MX);
        for (int i = 0; i < MX; i++) {
            spf[i] = i;
        }
        for (int i = 2; (long long)i * i < MX; i++) {
            if (spf[i] == i) {
                for (int j = i * i; j < MX; j += i) {
                    if (spf[j] == j) {
                        spf[j] = i;
                    }
                }
            }
        }

        // Union-find over values and primes: a swap is legal when the two
        // values share a prime, and chains of swaps make any two values in
        // one component mutually reachable.
        vector<int> parent(MX);
        for (int i = 0; i < MX; i++) {
            parent[i] = i;
        }

        // Link each value to each of its distinct primes. Indexing by value
        // (not position) automatically merges equal values across positions.
        for (int x : nums) {
            int v = x;
            while (v > 1) {
                int p = spf[v];
                unite(parent, x, p);
                while (v % p == 0) {
                    v /= p;
                }
            }
        }

        vector<int> target(nums);
        sort(target.begin(), target.end());
        // Sortable iff every element shares a component with its sorted
        // target; a position spanning two components is immovable.
        for (size_t i = 0; i < nums.size(); i++) {
            if (find(parent, nums[i]) != find(parent, target[i])) {
                return false;
            }
        }
        return true;
    }

  private:
    int find(vector<int> &parent, int a) {
        // Path halving keeps the forest shallow.
        while (parent[a] != a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    }

    void unite(vector<int> &parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
};
