#include <vector>

class Solution {
  public:
    vector<ListNode *> splitListToParts(ListNode *head, int k) {
        // First pass, count only: how many nodes are to spread over k
        // parts.
        int n = 0;
        for (ListNode *node = head; node != nullptr; node = node->next) {
            n += 1;
        }
        // Every part takes width = n / k nodes and the first extra = n % k
        // parts one more — the unique split whose sizes differ by at most
        // one with no earlier part smaller than a later one.
        int width = n / k;
        int extra = n % k;
        vector<ListNode *> parts;
        parts.reserve(k);
        ListNode *current = head;
        for (int index = 0; index < k; ++index) {
            // This part starts where the previous one was cut loose.
            parts.push_back(current);
            int size = width + (index < extra ? 1 : 0);
            // Hop to the part's last node. A zero-size part never enters
            // the loop (it arises only after every node was handed out, so
            // current is already null), and a positive-size part always
            // finds its size - 1 successors because the sizes sum to n.
            for (int step = 1; step < size; ++step) {
                current = current->next;
            }
            if (current != nullptr) {
                // Cut the part loose and let the next one start at its
                // successor.
                ListNode *following = current->next;
                current->next = nullptr;
                current = following;
            }
        }
        return parts;
    }
};
