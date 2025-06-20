// Question: How many trucks do I need to operate most efficiently in a month?
// Notes:
// > 1 month = 30 days
// > Every day, deliveries are made using 1 truck without missing a single day
// > Trucks need 3 days for 1 trip, from departure to return to the pool
// > The truck needs 1 day for repairs/maintenance before it can operate again
// > Each truck is allowed to depart on odd/even dates according to the truck number.
// > For operational time (1 trip) and maintenance duration, define as a variable that can be changed to any integer number

// Output: (a truck max 3 days operational 1 days maintenance, meaning 4 days in a single run, per odd/even numbered truck)
// Truck 1: 1, 5, 9, 13, 17, 21, 25, 29
// Truck 2: 2, 6, 10, 14, 18, 22, 26, 30
// Truck 3: 3, 7, 11, 15, 19, 23, 27
// Truck 4: 4, 8, 12, 16, 20, 24, 28
// TOTAL Trucks: 4

// Begin.

// Global variables
const operationalTime = 6; // can be changed to any integer number
const maintenanceDuration = 3; // can be changed to any integer number

function getTruckNumber(day) {
    /**
     * Example test method, case operational time 3, maintenance duration 1:
     * Day 1, 1 - 1 = 0, 0 modulo 4 = 0; 0 + 1 = 1 we get truck number 1.
     * Day 2, 2 - 1 = 1, 1 modulo 4 = 1; 1 + 1 = 2 we get truck number 2.
     * Day 3, 3 - 1 = 2, 2 modulo 4 = 2; 2 + 1 = 3 we get truck number 3.
     * Day 4, 4 - 1 = 3, 3 modulo 4 = 3; 3 + 1 = 4 we get truck number 4.
     * Day 5, 5 - 1 = 4, 4 modulo 4 = 0; 0 + 1 = 1 we get truck number 1.
     * Day 6, 6 - 1 = 5, 5 modulo 4 = 1; 1 + 1 = 2 we get truck number 2.
     * Day 7, 7 - 1 = 6, 6 modulo 4 = 2; 2 + 1 = 3 we get truck number 3.
     * Day 8, 8 - 1 = 7, 7 modulo 4 = 3; 3 + 1 = 4 we get truck number 4.
     * etc...
     */
    const durationMax = operationalTime + maintenanceDuration;
    return ((day - 1) % durationMax) + 1;
}

function getTruckSchedule() {
    const totalDays = 30; // in days
    const truckSchedule = {};

    let currentDay = 1;

    // Run from day 1 to day 30
    while (currentDay <= totalDays) {
        // Finding truck, and adding to schedule
        const truckNumber = getTruckNumber(currentDay);
        if (!truckSchedule.hasOwnProperty(truckNumber)) {
            truckSchedule[truckNumber] = [];
        }

        truckSchedule[truckNumber].push(currentDay);
        
        currentDay++;
    }

    return truckSchedule;
}

function showTruckSchedule(truckSchedule) {
    for (const truck in truckSchedule) {
        console.log(`Truck ${truck}: ${truckSchedule[truck].join(', ')}`);
    }
}

function showTotalScheduledTrucks(truckSchedule) {
    console.log(`TOTAL Trucks: ${Object.keys(truckSchedule).length}`);
}

const truckSchedule = getTruckSchedule();

showTruckSchedule(truckSchedule);
showTotalScheduledTrucks(truckSchedule);

// End.