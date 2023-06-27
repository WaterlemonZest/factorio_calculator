import React from "react";
import Popup from "reactjs-popup";
import Image from "next/image";
import styles from "./RecipeItem.module.css";
import utilStyles from "../src/app/page.module.css";
import clsx from "clsx";
import { RATE_UNITS, toUnit, RATE_ICONS } from "../domain/Calculations";
import { AddStageSignature } from "../src/app/page";
import ChoiceBoxSmall from "./ChoiceboxSmall";

interface RecipeItemStaticProps<isClickable> {
  item: string;
  IPS: number;
  displayUnit: keyof typeof RATE_UNITS;
  clickable: isClickable;
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
  function addStage() {
    if (!props.clickable) {
      return <></>;
    }
    props.addStage({
      item: props.item,
      IPS: props.IPS,
      displayUnit: props.displayUnit, // @TODO: come up with a way to put here the same unit as for Stage0 for user friendliness
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
        width={48}
        height={48}
        onClick={addStage}
      />
      {/* @TODO: implement changeble display unit */}
      <p className={styles.quantity}>{toUnit(props.displayUnit, props.IPS)}</p>

      <Popup
        trigger={
          <Image
            src={RATE_ICONS[props.displayUnit]}
            alt={props.displayUnit}
            width={32}
            height={32}
          />
        }
        className={styles.unit}
        position="bottom center"
        closeOnDocumentClick
      >
        Hello!
        {/*
        <ChoiceBoxSmall choices={RATE_ICONS} setStageUnit={setStageUnit} stageID={props.id}/>
*/}
      </Popup>
    </div>
  );
}

export default RecipeItem;
