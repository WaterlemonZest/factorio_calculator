const RECIPES = {
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
};
export function inputFor(IPS, item) {
  if (!RECIPES.hasOwnProperty(item))
    return [{ item: item, IPS: IPS, sub_recipe: false }];
  const yields = RECIPES[item].yields;

  return RECIPES[item].input.map((elem) => {
    return {
      item: elem[0],
      IPS: (IPS / yields) * elem[1],
      sub_recipe: RECIPES.hasOwnProperty(elem[0]),
    };
  });
}

const FACTORY_SPEEDS = {
  Assembling_machine_1: 0.5,
  Assembling_machine_2: 0.75,
  Assembling_machine_3: 1.25,
};

export function toFactories(IPS, item, factory) {
  const yields = RECIPES[item].yields;
  const seconds = RECIPES[item].seconds;
  return (IPS * seconds) / (yields * FACTORY_SPEEDS[factory]);
}

const RATE_UNITS = {
  IPS: 1,
  Transport_belt: 15,
};

export function toIPS(quantity, unit) {
  return quantity * RATE_UNITS[unit];
}
export function toUnit(unit, IPS) {
  return IPS / RATE_UNITS[unit];
}
