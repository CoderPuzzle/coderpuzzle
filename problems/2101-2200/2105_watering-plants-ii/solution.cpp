class Solution {
  public:
    int minimumRefill(vector<int> &plants, int capacityA, int capacityB) {
        int left = 0;
        int right = plants.size() - 1;
        int remainingA = capacityA;
        int remainingB = capacityB;
        int refills = 0;

        while (left < right) {
            if (remainingA < plants[left]) {
                remainingA = capacityA;
                refills++;
            }
            remainingA -= plants[left];

            if (remainingB < plants[right]) {
                remainingB = capacityB;
                refills++;
            }
            remainingB -= plants[right];
            left++;
            right--;
        }

        if (left == right && max(remainingA, remainingB) < plants[left]) {
            refills++;
        }
        return refills;
    }
};
