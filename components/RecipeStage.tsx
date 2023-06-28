import React, { ReactNode } from "react";
import Image from "next/image";
import utilStyles from "../src/app/page.module.css";
import styles from "./RecipeStage.module.css";
import { toFactories } from "../domain/Calculations";
import { Stage, DeleteStageSignature } from "../src/app/page";

type RecipeStageProps = Stage & {
  deleteStage: DeleteStageSignature;
  showCancel: boolean;
  children: ReactNode[];
};

function RecipeStage(props: RecipeStageProps) {
  // A RecipeStage effectively corresponds to a row in the table of results
  const cancelSize = 36;
  return (
    <>
      <div>
        {props.showCancel ? (
          <Image
            src="/Cross.png"
            alt="Delete"
            className={utilStyles.iconClickable}
            width={cancelSize}
            height={cancelSize}
            onClick={() => {
              props.deleteStage(props.id);
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {props.children[0]}
      <div>{toFactories(props.IPS, props.item, "Assembling_machine_1")}</div>
      <div className={styles.inputList}>{props.children[1]}</div>
    </>
  );
}

export default RecipeStage;
