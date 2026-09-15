function checkOverlap(
    radius: number,
    xCenter: number,
    yCenter: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
): boolean {
    // The nearest point of an axis-aligned box to any point is found
    // coordinate-wise: clamp each coordinate into the box's interval.
    const nearestX = Math.max(x1, Math.min(xCenter, x2));
    const nearestY = Math.max(y1, Math.min(yCenter, y2));
    const dx = xCenter - nearestX;
    const dy = yCenter - nearestY;
    return dx * dx + dy * dy <= radius * radius;
}
