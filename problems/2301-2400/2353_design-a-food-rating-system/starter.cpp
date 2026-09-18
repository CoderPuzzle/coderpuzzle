class FoodRatings {
  public:
    FoodRatings(vector<string> foods, vector<string> cuisines, vector<int> ratings);
    void changeRating(string food, int newRating);
    string highestRated(string cuisine);
};
