import { storageService } from "./async.storage.service";
import { stay_db } from "../data/db";

const STORAGE_KEY = "STAY_STORAGE_KEY";

_setupForLocalStorage();

const amenities=[
  "TV",
  "Cable TV",
  "Internet",
  "Wifi",
  "Air conditioning",
  "Wheelchair accessible",
  "Pool",
  "Kitchen",
  "Free parking on premises",
  "Doorman",
  "Gym",
  "Elevator",
  "Hot tub",
  "Heating",
  "Family/kid friendly",
  "Suitable for events",
  "Washer",
  "Dryer",
  "Smoke detector",
  "Carbon monoxide detector",
  "First aid kit",
  "Safety card",
  "Fire extinguisher",
  "Essentials",
  "Shampoo",
  "24-hour check-in",
  "Hangers",
  "Hair dryer",
  "Iron",
  "Laptop friendly workspace",
  "Self check-in",
  "Building staff",
  "Private entrance",
  "Room-darkening shades",
  "Hot water",
  "Bed linens",
  "Extra pillows and blankets",
  "Ethernet connection",
  "Luggage dropoff allowed",
  "Long term stays allowed",
  "Ground floor access",
  "Wide hallway clearance",
  "Step-free access",
  "Wide doorway",
  "Flat path to front door",
  "Well-lit path to entrance",
  "Disabled parking spot",
  "Step-free access",
  "Wide doorway",
  "Wide clearance to bed",
  "Step-free access",
  "Wide doorway",
  "Step-free access",
  "Wide entryway",
  "Waterfront",
  "Beachfront",
]

export const stayService = {
  query,
  getById,
  amenities
};

async function query(filterBy) {
  if (filterBy) {
  } else {
    return storageService.query(STORAGE_KEY);
  }
}

async function getById(stayId) {
  return storageService.get(STORAGE_KEY,stayId)
}

function _setupForLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stay_db));
  }
}

