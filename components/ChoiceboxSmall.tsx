import Image from "next/image";
import styles from "./ChoiceBoxSmall.module.css";
import { ReactElement, ReactNode, cloneElement } from "react";

type ChoiceBoxSmallProps = {
  choices: any;
  setStageUnit: (stageID: string, unit: string) => void;
  stageID: string;
};

function ChoiceBoxSmall(props: ChoiceBoxSmallProps) {
  // A pop-up for choosing an icon out of a small (<10) group

  // @TODO: eliminate this for in the future
  // because now for the life of me I cannot figure out
  // how to apply .map to an object
  let choiceList = [];
  for (let name in props.choices) {
    choiceList.push(
      <Image
        key={name}
        src={props.choices[name]}
        alt={name}
        onClick={() => props.setStageUnit(props.stageID, name)}
        width={48}
        height={48}
      />
    );
  }

  return <div className={styles.iconFlex}>{choiceList}</div>;
}

export default ChoiceBoxSmall;
