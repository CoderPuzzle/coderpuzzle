#include <random>
#include <vector>

// Walker alias table: n columns of height total, index i's own material
// filling weights[i] * n of its column and a donor's topping up the rest;
// one uniform cell of the n * total grid lands on index i's material with
// probability exactly weights[i] / total.
class Solution {
  public:
    Solution(std::vector<int> weights) {
        long long n = (long long)weights.size();
        long long sum = 0;
        for (int weight : weights) {
            sum += weight;
        }
        columns = n;
        total = sum;
        height.assign(n, 0);
        alias.assign(n, 0);
        std::vector<long long> small, large;
        for (long long c = 0; c < n; c++) {
            height[c] = (long long)weights[c] * n;
            if (height[c] < total) {
                small.push_back(c);
            } else {
                large.push_back(c);
            }
        }
        while (!small.empty() && !large.empty()) {
            long long under = small.back();
            long long over = large.back();
            small.pop_back();
            large.pop_back();
            alias[under] = (int)over;
            height[over] -= total - height[under];
            if (height[over] < total) {
                small.push_back(over);
            } else if (height[over] > total) {
                large.push_back(over);
            }
        }
    }

    int pickIndex() {
        std::uniform_int_distribution<long long> draw(0, total * columns - 1);
        long long cell = draw(rng);
        long long column = cell % columns;
        // level under the column's own material, else its alias
        return cell / columns < height[column] ? (int)column : alias[column];
    }

  private:
    long long columns;
    long long total;
    std::vector<long long> height;
    std::vector<int> alias;
    std::mt19937_64 rng{std::random_device{}()};
};
