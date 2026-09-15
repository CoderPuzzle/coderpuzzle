func convertTemperature(celsius float64) []float64 {
	// Apply the two conversion formulas from the statement directly:
	// kelvin shifts the Celsius scale by 273.15, fahrenheit scales it
	// by 1.80 and adds the 32.00 offset.
	kelvin := celsius + 273.15
	fahrenheit := celsius*1.80 + 32.00
	return []float64{kelvin, fahrenheit}
}
