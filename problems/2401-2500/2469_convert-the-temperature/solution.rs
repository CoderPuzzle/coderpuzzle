impl Solution {
    pub fn convert_temperature(celsius: f64) -> Vec<f64> {
        // Apply the two conversion formulas from the statement directly:
        // kelvin shifts the Celsius scale by 273.15, fahrenheit scales it
        // by 1.80 and adds the 32.00 offset.
        let kelvin = celsius + 273.15;
        let fahrenheit = celsius * 1.80 + 32.00;
        vec![kelvin, fahrenheit]
    }
}
