class Solution {
  public:
    vector<double> convertTemperature(double celsius) {
        // Apply the two conversion formulas from the statement directly:
        // kelvin shifts the Celsius scale by 273.15, fahrenheit scales it
        // by 1.80 and adds the 32.00 offset.
        double kelvin = celsius + 273.15;
        double fahrenheit = celsius * 1.80 + 32.00;
        return {kelvin, fahrenheit};
    }
};
