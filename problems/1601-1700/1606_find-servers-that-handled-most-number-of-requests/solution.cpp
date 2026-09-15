#include <algorithm>
#include <queue>
#include <utility>
#include <vector>

class Solution {
  public:
    vector<int> busiestServers(int k, vector<int> &arrival, vector<int> &load) {
        vector<int> tree(k + 1, 0);
        auto update = [&](int server, int delta) {
            int i = server + 1;
            while (i <= k) {
                tree[i] += delta;
                i += i & (-i);
            }
        };
        auto query = [&](int count) {
            int sum = 0;
            int i = count;
            while (i > 0) {
                sum += tree[i];
                i -= i & (-i);
            }
            return sum;
        };
        auto findKth = [&](int rank) {
            int pos = 0;
            int pw = 1;
            while (pw * 2 <= k) {
                pw *= 2;
            }
            while (pw > 0) {
                if (pos + pw <= k && tree[pos + pw] < rank) {
                    pos += pw;
                    rank -= tree[pos];
                }
                pw /= 2;
            }
            return pos;
        };

        for (int server = 0; server < k; server++) {
            update(server, 1);
        }

        int n = arrival.size();
        vector<int> counts(k, 0);
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> heap;

        for (int i = 0; i < n; i++) {
            long long startTime = arrival[i];
            while (!heap.empty() && heap.top().first <= startTime) {
                int freed = heap.top().second;
                heap.pop();
                update(freed, 1);
            }

            int totalFree = query(k);
            if (totalFree == 0) {
                continue;
            }

            int start = i % k;
            int beforeStart = query(start);
            int server;
            if (beforeStart < totalFree) {
                server = findKth(beforeStart + 1);
            } else {
                server = findKth(1);
            }

            update(server, -1);
            counts[server]++;
            heap.push({startTime + load[i], server});
        }

        int busiest = *max_element(counts.begin(), counts.end());
        vector<int> answer;
        for (int server = 0; server < k; server++) {
            if (counts[server] == busiest) {
                answer.push_back(server);
            }
        }
        return answer;
    }
};
