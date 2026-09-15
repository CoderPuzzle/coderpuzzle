class Solution {
  public:
    Solution(double radius, double x_center, double y_center)
        : radius_(radius), x_center_(x_center), y_center_(y_center) {}

    vector<double> randPoint() {
        double dx;
        double dy;
        do {
            dx = (2.0 * uniform() - 1.0) * radius_;
            dy = (2.0 * uniform() - 1.0) * radius_;
        } while (dx * dx + dy * dy > radius_ * radius_);
        double half = radius_ * 0.5;
        int i = min(3, max(0, int(floor(dx / half)) + 2));
        int j = min(3, max(0, int(floor(dy / half)) + 2));
        return {x_center_ + (i - 1.5) * half, y_center_ + (j - 1.5) * half};
    }

  private:
    // 53 uniform bits of mt19937_64 scaled to [0, 1).
    double uniform() { return (engine_() >> 11) * (1.0 / 9007199254740992.0); }

    double radius_;
    double x_center_;
    double y_center_;
    std::mt19937_64 engine_{478u};
};
