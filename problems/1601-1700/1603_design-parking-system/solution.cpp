class ParkingSystem {
  public:
    ParkingSystem(int big, int medium, int small) : slots_{0, big, medium, small} {}

    bool addCar(int carType) {
        if (slots_[carType] > 0) {
            slots_[carType]--;
            return true;
        }
        return false;
    }

  private:
    int slots_[4];
};
