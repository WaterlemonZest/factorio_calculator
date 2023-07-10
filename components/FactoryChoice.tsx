import Image from "next/image";
//import styles from "./UnitChoice.module.css";
import utilStyles from "@/app/page.module.css";
import { FACTORY_ICONS } from "../domain/Calculations";
import { SetFactoryTypeSignature } from "@/app/page";

type FactoryChoiceProps = {
  setFactoryType: SetFactoryTypeSignature;
  stageID: string;
};

function FactoryChoice(props: FactoryChoiceProps) {
  // A pop-up for choosing a factory type for a production stage
  const factoryChoiceSize = 48;

  // @TODO: eliminate this for loop in the future
  // because now for the life of me I cannot figure out
  // how to apply .map to an object
  let choiceList = [];
  for (let name in Object.keys(FACTORY_ICONS)) {
    choiceList.push(
      <Image
        key={name}
        src={FACTORY_ICONS[name]}
        alt={name}
        onClick={() => props.setFactoryType(props.stageID, name)}
        width={factoryChoiceSize}
        height={factoryChoiceSize}
        className={utilStyles.iconClickable}
      />
    );
  }

  return <div>{choiceList}</div>;
}

export default FactoryChoice;
