function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    asteroids.sort((left, right) => left - right);
    let currentMass = mass;
    for (const asteroid of asteroids) {
        if (currentMass < asteroid) {
            return false;
        }
        currentMass += asteroid;
    }
    return true;
}
