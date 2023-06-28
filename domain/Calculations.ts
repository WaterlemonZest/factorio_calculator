interface Recipe {
  yields: number;
  seconds: number;
  input: [string, number][];
}

export const RECIPES: { [key: string]: Recipe } = {
  Automation_science_pack: {
    yields: 1,
    seconds: 5,
    input: [
      ["Iron_gear_wheel", 1],
      ["Copper_plate", 1],
    ],
  },
  Iron_gear_wheel: {
    yields: 1,
    seconds: 0.5,
    input: [["Iron_plate", 2]],
  },
  Transport_belt: {
    yields: 2,
    seconds: 0.5,
    input: [
      ["Iron_gear_wheel", 1],
      ["Iron_plate", 1],
    ],
  },
  Copper_cable: {
    yields: 2,
    seconds: 0.5,
    input: [["Copper_plate", 1]],
  },
  Electronic_circuit: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Copper_cable", 3],
      ["Iron_plate", 1],
    ],
  },
  Inserter: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Electronic_circuit", 1],
      ["Iron_gear_wheel", 1],
      ["Iron_plate", 1],
    ],
  },
  Logistic_science_pack: {
    yields: 1,
    seconds: 6,
    input: [
      ["Inserter", 1],
      ["Transport_belt", 1],
    ],
  },
};

export function inputFor(
  IPS: number,
  item: keyof typeof RECIPES,
  displayUnit?: keyof typeof RATE_UNITS
) {
  const yields = RECIPES[item].yields;
  return RECIPES[item].input.map((elem) => {
    return {
      item: elem[0],
      IPS: (IPS / yields) * elem[1],
      sub_recipe: RECIPES.hasOwnProperty(elem[0]),
      displayUnit: displayUnit ? displayUnit : "IPS",
    };
  });
}

const FACTORY_SPEEDS = {
  Assembling_machine_1: 0.5,
  Assembling_machine_2: 0.75,
  Assembling_machine_3: 1.25,
};

export function toFactories(
  IPS: number,
  item: keyof typeof RECIPES,
  factory: keyof typeof FACTORY_SPEEDS
) {
  const yields = RECIPES[item].yields;
  const seconds = RECIPES[item].seconds;
  return (IPS * seconds) / (yields * FACTORY_SPEEDS[factory]);
}

// @TODO: bundle these objects together into 1
// and provide methods that will extract the information in the
// necessary formats
export const RATE_UNITS = {
  IPS: 1,
  Transport_belt: 15,
};
export const RATE_ICONS: Record<string, string> = {
  IPS: "/IPS.png",
  Transport_belt: "/factorio-assets/Transport_belt.png",
};

export function toIPS(quantity: number, unit: keyof typeof RATE_UNITS) {
  return quantity * RATE_UNITS[unit];
}
export function toUnit(unit: keyof typeof RATE_UNITS, IPS: number) {
  return IPS / RATE_UNITS[unit];
}
