function convertTemperature(celsius: number): number[] {
    // Apply the two conversion formulas from the statement directly:
    // kelvin shifts the Celsius scale by 273.15, fahrenheit scales it
    // by 1.80 and adds the 32.00 offset.
    const kelvin = celsius + 273.15;
    const fahrenheit = celsius * 1.8 + 32.0;
    return [kelvin, fahrenheit];
}
