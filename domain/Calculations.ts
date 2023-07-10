interface Recipe {
  yields: number;
  seconds: number;
  input: [string, number][];
  category: string;
}

export const RECIPES: { [key: string]: Recipe } = {
  Automation_science_pack: {
    yields: 1,
    seconds: 5,
    input: [
      ["Iron_gear_wheel", 1],
      ["Copper_plate", 1],
    ],
    category: "Science",
  },
  Iron_gear_wheel: {
    yields: 1,
    seconds: 0.5,
    input: [["Iron_plate", 2]],
    category: "Components",
  },
  Transport_belt: {
    yields: 2,
    seconds: 0.5,
    input: [
      ["Iron_gear_wheel", 1],
      ["Iron_plate", 1],
    ],
    category: "Logistics",
  },
  Fast_transport_belt: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Iron_gear_wheel", 5],
      ["Transport_belt", 1],
    ],
    category: "Logistics",
  },
  Express_transport_belt: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Fast_transport_belt", 1],
      ["Iron_gear_wheel", 10],
      ["Lubricant", 20],
    ],
    category: "Logistics",
  },
  Copper_cable: {
    yields: 2,
    seconds: 0.5,
    input: [["Copper_plate", 1]],
    category: "Components",
  },
  Electronic_circuit: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Copper_cable", 3],
      ["Iron_plate", 1],
    ],
    category: "Components",
  },
  Inserter: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Electronic_circuit", 1],
      ["Iron_gear_wheel", 1],
      ["Iron_plate", 1],
    ],
    category: "Logistics",
  },
  Logistic_science_pack: {
    yields: 1,
    seconds: 6,
    input: [
      ["Inserter", 1],
      ["Transport_belt", 1],
    ],
    category: "Science",
  },
  Assembling_machine_1: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Electronic_circuit", 3],
      ["Iron_gear_wheel", 5],
      ["Iron_plate", 9],
    ],
    category: "Production",
  },
  Assembling_machine_2: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Assembling_machine_1", 1],
      ["Electronic_circuit", 3],
      ["Iron_gear_wheel", 5],
      ["Steel_plate", 2],
    ],
    category: "Production",
  },
  Assembling_machine_3: {
    yields: 1,
    seconds: 0.5,
    input: [
      ["Assembling_machine_2", 2],
      ["Speed_module", 4],
    ],
    category: "Production",
  },
  Speed_module: {
    yields: 1,
    seconds: 15,
    input: [
      ["Advanced_circuit", 5],
      ["Electronic_circuit", 5],
    ],
    category: "Production",
  },
  Advanced_circuit: {
    yields: 1,
    seconds: 6,
    input: [
      ["Copper_cable", 4],
      ["Electronic_circuit", 2],
      ["Plastic_bar", 2],
    ],
    category: "Components",
  },
  Processing_unit: {
    yields: 1,
    seconds: 10,
    input: [
      ["Advanced_circuit", 2],
      ["Electronic_circuit", 20],
      ["Sulfuric_acid", 5],
    ],
    category: "Components",
  },
  Military_science_pack: {
    yields: 2,
    seconds: 10,
    input: [
      ["Grenade", 1],
      ["Piercing_rounds_magazine", 1],
      ["Wall", 2],
    ],
    category: "Science",
  },
  Grenade: {
    yields: 1,
    seconds: 8,
    input: [
      ["Coal", 10],
      ["Iron_plate", 5],
    ],
    category: "Military",
  },
  Firearm_magazine: {
    yields: 1,
    seconds: 1,
    input: [["Iron_plate", 4]],
    category: "Military",
  },
  Piercing_rounds_magazine: {
    yields: 1,
    seconds: 3,
    input: [
      ["Copper_plate", 5],
      ["Firearm_magazine", 1],
      ["Steel_plate", 1],
    ],
    category: "Military",
  },
  Wall: {
    yields: 1,
    seconds: 0.5,
    input: [["Stone_brick", 5]],
    category: "Military",
  },
  Chemical_science_pack: {
    yields: 2,
    seconds: 24,
    input: [
      ["Advanced_circuit", 3],
      ["Engine_unit", 2],
      ["Sulfur", 1],
    ],
    category: "Science",
  },
  Engine_unit: {
    yields: 1,
    seconds: 10,
    input: [
      ["Iron_gear_wheel", 1],
      ["Pipe", 2],
      ["Steel_plate", 1],
    ],
    category: "Components",
  },
  Electric_engine_unit: {
    yields: 1,
    seconds: 10,
    input: [
      ["Electronic_circuit", 2],
      ["Engine_unit", 1],
      ["Lubricant", 15],
    ],
    category: "Components",
  },
  Pipe: {
    yields: 1,
    seconds: 0.5,
    input: [["Iron_plate", 1]],
    category: "Logistics",
  },
  Production_science_pack: {
    yields: 3,
    seconds: 21,
    input: [
      ["Electric_furnace", 1],
      ["Productivity_module", 1],
      ["Straight_rail", 30],
    ],
    category: "Science",
  },
  Productivity_module: {
    yields: 1,
    seconds: 15,
    input: [
      ["Advanced_circuit", 5],
      ["Electronic_circuit", 5],
    ],
    category: "Production",
  },
  Efficiency_module: {
    yields: 1,
    seconds: 15,
    input: [
      ["Advanced_circuit", 5],
      ["Electronic_circuit", 5],
    ],
    category: "Production",
  },
  Stone_furnace: {
    yields: 1,
    seconds: 0.5,
    input: [["Stone", 5]],
    category: "Production",
  },
  Steel_furnace: {
    yields: 1,
    seconds: 3,
    input: [
      ["Steel_plate", 6],
      ["Stone_brick", 10],
    ],
    category: "Production",
  },
  Electric_furnace: {
    yields: 1,
    seconds: 5,
    input: [
      ["Advanced_circuit", 5],
      ["Steel_plate", 10],
      ["Stone_brick", 10],
    ],
    category: "Production",
  },
  Straight_rail: {
    yields: 2,
    seconds: 0.5,
    input: [
      ["Iron_stick", 1],
      ["Steel_plate", 1],
      ["Stone", 1],
    ],
    category: "Logistics",
  },
  Iron_stick: {
    yields: 2,
    seconds: 0.5,
    input: [["Iron_plate", 1]],
    category: "Components",
  },
  Utility_science_pack: {
    yields: 3,
    seconds: 21,
    input: [
      ["Flying_robot_frame", 1],
      ["Low_density_structure", 3],
      ["Processing_unit", 2],
    ],
    category: "Science",
  },
  Flying_robot_frame: {
    yields: 1,
    seconds: 20,
    input: [
      ["Battery", 2],
      ["Electric_engine_unit", 1],
      ["Electronic_circuit", 3],
      ["Steel_plate", 1],
    ],
    category: "Components",
  },
  Low_density_structure: {
    yields: 1,
    seconds: 20,
    input: [
      ["Copper_plate", 20],
      ["Plastic_bar", 5],
      ["Steel_plate", 2],
    ],
    category: "Components",
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

export const FACTORY_SPEEDS = {
  Assembling_machine_1: 0.5,
  Assembling_machine_2: 0.75,
  Assembling_machine_3: 1.25,
};
export const FACTORY_ICONS: Record<string, string> = {
  Assembling_machine_1: "/factorio-assets/Assembling_machine_1.png",
  Assembling_machine_2: "/factorio-assets/Assembling_machine_2.png",
  Assembling_machine_3: "/factorio-assets/Assembling_machine_3.png",
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
  Fast_transport_belt: 30,
  Express_transport_belt: 45,
};
export const RATE_ICONS: Record<string, string> = {
  IPS: "/IPS.png",
  Transport_belt: "/factorio-assets/Transport_belt.png",
  Fast_transport_belt: "/factorio-assets/Fast_transport_belt.png",
  Express_transport_belt: "/factorio-assets/Express_transport_belt.png",
};

export function toIPS(quantity: number, unit: keyof typeof RATE_UNITS) {
  return quantity * RATE_UNITS[unit];
}
export function toUnit(unit: keyof typeof RATE_UNITS, IPS: number) {
  return IPS / RATE_UNITS[unit];
}
