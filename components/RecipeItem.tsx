import React, { ReactNode } from "react";
import Popup from "reactjs-popup";
import Image from "next/image";
import styles from "./RecipeItem.module.css";
import utilStyles from "../src/app/page.module.css";
import clsx from "clsx";
import { RATE_UNITS, toUnit, RATE_ICONS } from "../domain/Calculations";
import { AddStageSignature } from "../src/app/page";
import { presentable } from "@/app/NumberManipulations";

interface RecipeItemStaticProps<isClickable> {
  item: string;
  IPS: number;
  displayUnit: keyof typeof RATE_UNITS;
  clickable: isClickable;
  children: ReactNode;
}
interface RecipeItemExpandableProps<isClickable>
  extends RecipeItemStaticProps<isClickable> {
  id: string;
  addStage: AddStageSignature;
}
type RecipeItemProps<isClickable = boolean> = isClickable extends true
  ? RecipeItemExpandableProps<isClickable>
  : RecipeItemStaticProps<isClickable>;

function RecipeItem(props: RecipeItemProps) {
  // A RecipeItem corresponds to a bundle of {item, quantity, unit} displayed in RecipeStage
  const iconPath = `/factorio-assets/${props.item}.png`;
  const iconSize = 48;
  const displayUnitSize = 32;
  function addStage() {
    if (!props.clickable) {
      return <></>;
    }
    props.addStage({
      item: props.item,
      IPS: props.IPS,
      displayUnit: props.displayUnit,
      id: props.id,
    });
  }

  return (
    <div className={styles.wrapper}>
      <Image
        className={clsx(
          styles.icon,
          props.clickable && utilStyles.iconClickable
        )}
        src={iconPath}
        alt={props.item}
        width={iconSize}
        height={iconSize}
        onClick={addStage}
      />
      <p className={styles.quantity}>
        {presentable(toUnit(props.displayUnit, props.IPS))}
      </p>

      <Popup
        trigger={
          <Image
            src={RATE_ICONS[props.displayUnit]}
            alt={props.displayUnit}
            width={displayUnitSize}
            height={displayUnitSize}
          />
        }
        className={styles.unit}
        position="bottom center"
        closeOnDocumentClick
      >
        {props.children}
      </Popup>
    </div>
  );
}

export default RecipeItem;
