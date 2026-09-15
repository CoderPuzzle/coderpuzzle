#include <deque>
#include <string>
#include <unordered_set>
#include <utility>
#include <vector>

// The body as a deque (head at the front, tail at the back) plus a hash
// set of the cells it covers, each encoded as row * width + col; move()
// pushes the new head on and — unless food is eaten — pops the tail in
// the same step, so the snake slides forward exactly one cell and the
// set answers the body-collision question in O(1).
class SnakeGame {
  public:
    SnakeGame(int width, int height, vector<vector<int>> food) : width(width), height(height), food(std::move(food)) {
        body.emplace_back(0, 0);
        occupied.insert(0);
    }

    int move(string direction) {
        auto [row, col] = body.front();
        if (direction == "U") {
            --row;
        } else if (direction == "D") {
            ++row;
        } else if (direction == "L") {
            --col;
        } else {
            ++col;
        }
        if (row < 0 || row >= height || col < 0 || col >= width) {
            return -1;
        }
        bool eating = nextFood < (int)food.size() && food[nextFood][0] == row && food[nextFood][1] == col;
        if (!eating) {
            // The tail vacates its cell in this very step, so a head
            // landing on the CURRENT tail position is legal.
            occupied.erase(key(body.back().first, body.back().second));
            body.pop_back();
        }
        if (occupied.count(key(row, col))) {
            return -1;
        }
        body.emplace_front(row, col);
        occupied.insert(key(row, col));
        if (eating) {
            ++nextFood;
            ++score;
        }
        return score;
    }

  private:
    long long key(int row, int col) const { return 1LL * row * width + col; }

    int width;
    int height;
    vector<vector<int>> food;
    deque<pair<int, int>> body;
    unordered_set<long long> occupied;
    int nextFood = 0;
    int score = 0;
};
