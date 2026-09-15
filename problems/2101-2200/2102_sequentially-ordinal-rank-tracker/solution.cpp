#include <queue>
#include <string>
#include <vector>

using namespace std;

class SORTracker {
    struct Location {
        string name;
        int score;
    };

    struct PrefixCompare {
        bool operator()(const Location &left, const Location &right) const {
            if (left.score != right.score) {
                return left.score > right.score;
            }
            return left.name < right.name;
        }
    };

    struct RemainingCompare {
        bool operator()(const Location &left, const Location &right) const {
            if (left.score != right.score) {
                return left.score < right.score;
            }
            return left.name > right.name;
        }
    };

    priority_queue<Location, vector<Location>, PrefixCompare> prefix;
    priority_queue<Location, vector<Location>, RemainingCompare> remaining;

  public:
    SORTracker() = default;

    void add(string name, int score) {
        prefix.push({name, score});
        remaining.push(prefix.top());
        prefix.pop();
    }

    string get() {
        prefix.push(remaining.top());
        remaining.pop();
        return prefix.top().name;
    }
};
