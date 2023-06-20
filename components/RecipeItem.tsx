import React from "react";
import Image from "next/image";
import styles from "./RecipeItem.module.css";
import utilStyles from "../src/app/page.module.css";
import clsx from "clsx";
import { RATE_UNITS } from "../domain/Calculations";
import { Stage } from "../src/app/page";

interface StaticRecipeItemProps<isClickable> {
  item: string;
  IPS: number;
  displayUnit: keyof typeof RATE_UNITS;
  clickable: isClickable;
}
interface ExtendableRecipeItemProps<isClickable>
  extends StaticRecipeItemProps<isClickable> {
  id: string;
  addStage: (newStage: Stage) => void;
}
type RecipeItemProps<isClickable = boolean> = isClickable extends true
  ? ExtendableRecipeItemProps<isClickable>
  : StaticRecipeItemProps<isClickable>;

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
      displayUnit: "IPS", // @TODO: come up with a way to put here the same unit as for Stage0 for user friendliness
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
      <p className={styles.quantity}>{props.IPS}</p>
      <p className={styles.unit}>IPS</p>
    </div>
  );
}

export default RecipeItem;
