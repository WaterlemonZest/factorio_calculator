import React, { ReactNode } from "react";
import Image from "next/image";
import utilStyles from "../src/app/page.module.css";
import styles from "./RecipeStage.module.css";
import RecipeItem from "./RecipeItem";
import { toFactories } from "../domain/Calculations";
import { Stage, DeleteStageSignature } from "../src/app/page";

type RecipeStageProps = Stage & {
  deleteStage: DeleteStageSignature;
  showCancel: boolean;
  children: ReactNode[];
};

function RecipeStage(props: RecipeStageProps) {
  // A RecipeStage effectively corresponds to a row in the table of results
  return (
    <>
      <div>
        {props.showCancel ? (
          <Image
            src="/Cross.png"
            alt="Delete"
            className={utilStyles.iconClickable}
            width={36}
            height={36}
            onClick={() => {
              props.deleteStage(props.id);
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {/* @TODO: implement the functionality of changing the unit of measurement */}
      <RecipeItem
        item={props.item}
        IPS={props.IPS}
        displayUnit={props.displayUnit}
        clickable={false}
      />
      <div>{toFactories(props.IPS, props.item, "Assembling_machine_1")}</div>
      <div className={styles.inputList}>{props.children}</div>
    </>
  );
}

export default RecipeStage;
