#include <string>
#include <vector>

class BrowserHistory {
  public:
    BrowserHistory(std::string homepage) {
        history.push_back(homepage);
        cur = 0;
    }

    void visit(std::string url) {
        history.resize(cur + 1);
        history.push_back(url);
        ++cur;
    }

    std::string back(int steps) {
        cur = std::max(0, cur - steps);
        return history[cur];
    }

    std::string forward(int steps) {
        cur = std::min((int)history.size() - 1, cur + steps);
        return history[cur];
    }

  private:
    std::vector<std::string> history;
    int cur;
};
