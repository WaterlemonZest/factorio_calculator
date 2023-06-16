import React from "react";
import Image from "next/image";
import styles from "./RecipeItem.module.css";
import utilStyles from "../src/app/page.module.css";
import clsx from "clsx";
import { toUnit } from "../domain/Calculations";

function RecipeItem(props) {
  // A RecipeItem corresponds to a bundle of {item, quantity, unit} displayed in RecipeStage
  const iconPath = `/factorio-assets/${props.item}.png`;
  function addStage() {
    if (!props.clickable) {
      return 0;
    }
    props.addStage({
      item: props["item"],
      IPS: props["IPS"],
      displayUnit: "IPS", // @TODO: come up with a way to put here the same unit as for Stage0 for user friendliness
      id: props["id"],
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
