import Image from "next/image";
import styles from "./UnitChoice.module.css";
import utilStyles from "@/app/page.module.css";
import { RATE_ICONS } from "../domain/Calculations";
import { SetStageUnitSignature } from "@/app/page";

type UnitChoiceProps = {
  setStageUnit: SetStageUnitSignature;
  stageID: string;
};

function UnitChoice(props: UnitChoiceProps) {
  // A pop-up for choosing a display unit for an item
  const unitChoiceSize = 48;

  // @TODO: eliminate this for loop in the future
  // because now for the life of me I cannot figure out
  // how to apply .map to an object
  let choiceList = [];
  let options: Record<string, string> = { ...RATE_ICONS, IPS: "/IPS_bg.png" };
  for (let name in options) {
    choiceList.push(
      <Image
        key={name}
        src={options[name]}
        alt={name}
        onClick={() => props.setStageUnit(props.stageID, name)}
        width={unitChoiceSize}
        height={unitChoiceSize}
        className={utilStyles.iconClickable}
      />
    );
  }

  return <div>{choiceList}</div>;
}

export default UnitChoice;
