/**
 * @param {number[][]} lights
 * @return {number}
 */
var brightestPosition = function (lights) {
    const events = new Map();
    for (const [position, radius] of lights) {
        const left = position - radius;
        const afterRight = position + radius + 1;
        events.set(left, (events.get(left) || 0) + 1);
        events.set(afterRight, (events.get(afterRight) || 0) - 1);
    }

    const coordinates = [...events.keys()].sort((a, b) => a - b);
    let brightness = 0;
    let bestBrightness = 0;
    let answer = 0;
    for (const coordinate of coordinates) {
        brightness += events.get(coordinate);
        if (brightness > bestBrightness) {
            bestBrightness = brightness;
            answer = coordinate;
        }
    }
    return answer;
};
