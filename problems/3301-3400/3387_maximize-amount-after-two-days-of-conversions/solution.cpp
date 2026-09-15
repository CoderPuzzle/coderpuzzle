#include <queue>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

class Solution {
  public:
    // Day 1 ends holding some intermediate currency c, and day 2
    // converts c back to initialCurrency. Rates are consistent (no
    // contradictions), so the first BFS visit to a currency already
    // carries its maximum amount: day 1 is one BFS from initialCurrency
    // (forward edges multiply by the rate, reverse edges divide by it),
    // and day 2 reruns the same BFS from every currency reached on
    // day 1, carrying that currency's amount. The answer is the largest
    // amount of initialCurrency any of those searches ends with.
    double maxAmount(string initialCurrency, vector<vector<string>> &pairs1, vector<double> &rates1,
                     vector<vector<string>> &pairs2, vector<double> &rates2) {
        unordered_map<string, int> ids;
        // Register initialCurrency first: it may appear in no pair at all.
        int source = ids[initialCurrency];
        vector<vector<Edge>> day1 = build(pairs1, rates1, ids);
        vector<vector<Edge>> day2 = build(pairs2, rates2, ids);
        int n = ids.size();
        // Amounts are always positive, so -1.0 marks "not visited yet".
        vector<double> day1Amount(n, -1.0);
        vector<int> order;
        queue<int> next;
        day1Amount[source] = 1.0;
        order.push_back(source);
        next.push(source);
        while (!next.empty()) {
            int currency = next.front();
            next.pop();
            for (const Edge &edge : day1[currency]) {
                if (day1Amount[edge.target] >= 0.0)
                    continue;
                day1Amount[edge.target] =
                    edge.forward ? day1Amount[currency] * edge.rate : day1Amount[currency] / edge.rate;
                order.push_back(edge.target);
                next.push(edge.target);
            }
        }
        double best = 0.0;
        vector<double> amount(n);
        for (int start : order) {
            fill(amount.begin(), amount.end(), -1.0);
            amount[start] = day1Amount[start];
            next.push(start);
            while (!next.empty()) {
                int currency = next.front();
                next.pop();
                for (const Edge &edge : day2[currency]) {
                    if (amount[edge.target] >= 0.0)
                        continue;
                    amount[edge.target] = edge.forward ? amount[currency] * edge.rate : amount[currency] / edge.rate;
                    next.push(edge.target);
                }
            }
            best = max(best, amount[source]);
        }
        return best;
    }

  private:
    struct Edge {
        int target;
        double rate;
        bool forward;
    };

    static vector<vector<Edge>> build(vector<vector<string>> &pairs, vector<double> &rates,
                                      unordered_map<string, int> &ids) {
        vector<vector<Edge>> graph;
        for (int i = 0; i < (int)pairs.size(); ++i) {
            int start = ids.emplace(pairs[i][0], (int)ids.size()).first->second;
            int target = ids.emplace(pairs[i][1], (int)ids.size()).first->second;
            graph.resize(ids.size());
            graph[start].push_back({target, rates[i], true});
            graph[target].push_back({start, rates[i], false});
        }
        return graph;
    }
};
