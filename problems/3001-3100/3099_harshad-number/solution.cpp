class Solution {
  public:
    int sumOfTheDigitsOfHarshadNumber(int x) {
        // Extract digits by repeated division (hint 1), then the definition
        // itself finishes the job: x is a Harshad number exactly when its
        // digit sum divides it. With x <= 100 there are at most three digits
        // and every intermediate fits an int comfortably.
        int total = 0;
        int remaining = x;
        while (remaining > 0) {
            total += remaining % 10;
            remaining /= 10;
        }
        return x % total == 0 ? total : -1;
    }
};
