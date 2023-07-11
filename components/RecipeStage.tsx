import React, { ReactNode } from "react";
import Image from "next/image";
import Popup from "reactjs-popup";
import utilStyles from "../src/app/page.module.css";
import styles from "./RecipeStage.module.css";
import { toFactories, FACTORY_ICONS } from "../domain/Calculations";
import { Stage, DeleteStageSignature } from "../src/app/page";
import { presentableInt } from "@/app/NumberManipulations";
import { imageAsset } from "@/app/EnvFunctions";

type RecipeStageProps = Stage & {
  deleteStage: DeleteStageSignature;
  showCancel: boolean;
  children: ReactNode[];
};

function RecipeStage(props: RecipeStageProps) {
  // A RecipeStage effectively corresponds to a row in the table of results
  const cancelSize = 36;
  const factoryIconSize = 48;
  return (
    <>
      <div className={styles.cancelContainer}>
        {props.showCancel ? (
          <Image
            src={imageAsset("/Cross.png")}
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
      <div className={styles.factoryContainer}>
        <Popup
          trigger={
            <Image
              src={imageAsset(FACTORY_ICONS[props.factory])}
              alt={props.factory}
              className={utilStyles.iconClickable}
              width={factoryIconSize}
              height={factoryIconSize}
            />
          }
          position="bottom center"
          closeOnDocumentClick
        >
          {props.children[1]}
        </Popup>

        {presentableInt(toFactories(props.IPS, props.item, props.factory))}
      </div>
      <div className={styles.inputList}>{props.children[2]}</div>
    </>
  );
}

export default RecipeStage;
