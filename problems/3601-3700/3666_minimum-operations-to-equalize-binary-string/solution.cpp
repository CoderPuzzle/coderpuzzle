class Solution {
  public:
    int minOperations(string s, int k) {
        int n = s.size();
        int z = 0;
        for (char ch : s) {
            if (ch == '0') {
                z++;
            }
        }
        // Only the count z of zeros matters: an operation flips i of the
        // current zeros and k - i of the ones, moving z to z + k - 2 * i
        // for any legal i — one contiguous same-parity range per step.
        if (z == 0) {
            return 0;
        }
        // BFS over zero counts 0..n toward 0. Two skip lists (one per
        // parity) hold the unvisited states, so each state enters the
        // queue exactly once even though edges are whole intervals.
        vector<int> nextEven(n / 2 + 2), nextOdd((n + 1) / 2 + 1);
        iota(nextEven.begin(), nextEven.end(), 0);
        iota(nextOdd.begin(), nextOdd.end(), 0);
        auto find = [](vector<int> &nxt, int i) {
            int root = i;
            while (nxt[root] != root) {
                root = nxt[root];
            }
            while (nxt[i] != root) { // path compression
                int up = nxt[i];
                nxt[i] = root;
                i = up;
            }
            return root;
        };
        vector<int> dist(n + 1, -1), queue;
        queue.reserve(n + 1);
        dist[z] = 0;
        queue.push_back(z);
        int start = z >> 1;
        if (z % 2 == 0) {
            nextEven[start] = start + 1;
        } else {
            nextOdd[start] = start + 1;
        }
        for (int head = 0; head < (int)queue.size(); head++) {
            int cur = queue[head];
            int lo = max(0, k - (n - cur));
            int hi = min(k, cur);
            int low = cur + k - 2 * hi;
            int high = cur + k - 2 * lo;
            int p = (cur + k) & 1;
            vector<int> &nxt = (p == 0) ? nextEven : nextOdd;
            int d = dist[cur] + 1;
            int j = find(nxt, low >> 1);
            while (j < (int)nxt.size() - 1) {
                int v = 2 * j + p;
                if (v > high) {
                    break;
                }
                dist[v] = d;
                if (v == 0) {
                    return d;
                }
                nxt[j] = j + 1;
                queue.push_back(v);
                j = find(nxt, j + 1);
            }
        }
        return -1;
    }
};
