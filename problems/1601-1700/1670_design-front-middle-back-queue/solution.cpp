#include <deque>

// Two deques split at the middle: front_ holds the first ceil(n/2)
// elements, back_ the rest, so the middle always sits at an end of each
// deque — balance() restores the split after every mutating call.
class FrontMiddleBackQueue {
  public:
    FrontMiddleBackQueue() = default;

    void pushFront(int val) {
        front_.push_front(val);
        balance();
    }

    void pushMiddle(int val) {
        // The new element must land one slot before the current back of
        // front_ (the frontmost middle of the result), so when front_ is
        // the bigger half, its last element moves to back_ first — the
        // push_back then writes exactly the middle slot.
        if (front_.size() > back_.size()) {
            back_.push_front(front_.back());
            front_.pop_back();
        }
        front_.push_back(val);
    }

    void pushBack(int val) {
        back_.push_back(val);
        balance();
    }

    int popFront() {
        if (front_.empty()) {
            return -1;
        }
        int val = front_.front();
        front_.pop_front();
        balance();
        return val;
    }

    int popMiddle() {
        // ceil(n/2) elements in front_ means the frontmost middle — the
        // back of front_ — at every length, odd or even.
        if (front_.empty()) {
            return -1;
        }
        int val = front_.back();
        front_.pop_back();
        balance();
        return val;
    }

    int popBack() {
        int val;
        if (!back_.empty()) {
            val = back_.back();
            back_.pop_back();
        } else if (front_.empty()) {
            return -1;
        } else {
            val = front_.back();
            front_.pop_back();
        }
        balance();
        return val;
    }

  private:
    void balance() {
        if (front_.size() > back_.size() + 1) {
            back_.push_front(front_.back());
            front_.pop_back();
        } else if (front_.size() < back_.size()) {
            front_.push_back(back_.front());
            back_.pop_front();
        }
    }

    std::deque<int> front_;
    std::deque<int> back_;
};
