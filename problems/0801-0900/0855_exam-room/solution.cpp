#include <queue>
#include <set>
#include <stdexcept>
#include <utility>
#include <vector>

class ExamRoom {
  public:
    ExamRoom(int n) : n(n) {}

    int seat() {
        if (occupied.empty()) {
            occupied.push_back(0);
            addSegment(0, n);
            return 0;
        }
        while (!heap.empty()) {
            Segment top = heap.top();
            heap.pop();
            if (live.count({top.l, top.r}) == 0) {
                continue; // stale entry
            }
            live.erase({top.l, top.r});
            occupied.insert(std::lower_bound(occupied.begin(), occupied.end(), top.spot), top.spot);
            addSegment(top.l, top.spot);
            addSegment(top.spot, top.r);
            return top.spot;
        }
        throw std::runtime_error("no seat available");
    }

    void leave(int p) {
        int index = int(std::lower_bound(occupied.begin(), occupied.end(), p) - occupied.begin());
        occupied.erase(occupied.begin() + index);
        int previous = index > 0 ? occupied[index - 1] : -1;
        int next = index < int(occupied.size()) ? occupied[index] : n;
        live.erase({previous, p});
        live.erase({p, next});
        if (!occupied.empty() && next - previous >= 2) {
            addSegment(previous, next);
        }
    }

  private:
    // A free gap spanning adjacent occupied seats l and r (sentinels -1
    // and n at the edges); candidate seat and distance are pure functions
    // of the pair, so stale heap entries are safe to skip.
    struct Segment {
        int dist;
        int spot;
        int l;
        int r;
    };

    // Ranks segments for the max-heap: the top has the largest distance
    // and, on ties, the lower seat number.
    struct Worse {
        bool operator()(const Segment &a, const Segment &b) const {
            if (a.dist != b.dist) {
                return a.dist < b.dist;
            }
            return a.spot > b.spot;
        }
    };

    void addSegment(int l, int r) {
        if (r - l < 2) {
            return; // no free seat strictly between
        }
        int dist;
        int spot;
        if (l == -1) {
            dist = r;
            spot = 0;
        } else if (r == n) {
            dist = n - 1 - l;
            spot = n - 1;
        } else {
            spot = (l + r) / 2;
            dist = (r - l) / 2;
        }
        live.insert({l, r});
        heap.push(Segment{dist, spot, l, r});
    }

    int n;
    std::vector<int> occupied; // sorted seat numbers
    std::set<std::pair<int, int>> live;
    std::priority_queue<Segment, std::vector<Segment>, Worse> heap;
};
