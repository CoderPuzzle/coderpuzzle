#include <utility>
#include <vector>

class StockSpanner {
  public:
    StockSpanner() = default;

    int next(int price) {
        int span = 1;
        while (!stack.empty() && stack.back().first <= price) {
            span += stack.back().second;
            stack.pop_back();
        }
        stack.emplace_back(price, span);
        return span;
    }

  private:
    std::vector<std::pair<int, int>> stack;
};
