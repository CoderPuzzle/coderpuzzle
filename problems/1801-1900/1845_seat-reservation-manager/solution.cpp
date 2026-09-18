#include <functional>
#include <queue>
#include <vector>

class SeatManager {
  public:
    SeatManager(int) : nextSeat(1) {}

    int reserve() {
        // Prefer the smallest returned seat; the top is always < nextSeat,
        // so the two sources of free seats never overlap.
        if (!returned.empty() && returned.top() < nextSeat) {
            int seat = returned.top();
            returned.pop();
            return seat;
        }
        // No outstanding returns: the next fresh seat is simply nextSeat.
        return nextSeat++;
    }

    void unreserve(int seat) {
        // The monotone counter march is disrupted by exactly this one seat.
        returned.push(seat);
    }

  private:
    // Largest seat number ever reserved: fresh seats march upward from here.
    int nextSeat;
    // Min-heap holding ONLY currently returned seats — never the untouched ones.
    std::priority_queue<int, std::vector<int>, std::greater<int>> returned;
};
