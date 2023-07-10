import { RECIPES } from "../domain/Calculations";
import styles from "./ItemChoiceDialog.module.css";
import Image from "next/image";
import { SetTargetItemSignature } from "@/app/page";

type ItemChoiceDialogProps = {
  setTargetItem: SetTargetItemSignature;
};

export function showItemChoice() {
  const dialog = document.getElementById("itemChoice");
  if (!dialog || !(dialog instanceof HTMLDialogElement)) return;
  dialog.showModal();
}
export function closeItemChoice() {
  const dialog = document.getElementById("itemChoice");
  if (!dialog || !(dialog instanceof HTMLDialogElement)) return;
  dialog.close();
}
export default function ItemChoiceDialog(props: ItemChoiceDialogProps) {
  // put each recipe into its respective category bin
  let categorized = Object();
  let test = Object.keys(RECIPES);
  for (const recipeName of test) {
    var categoryName = RECIPES[recipeName].category;
    if (!(categoryName in categorized)) categorized[categoryName] = Array();
    categorized[categoryName].push(recipeName);
  }

  // construct html write-up by grabbing image for each recipe
  const iconSize = 40;
  let displayBlock = Array();
  for (const categoryName of Object.keys(categorized)) {
    displayBlock.push(<p>{categoryName}</p>);
    let imageSeries = Array();
    for (const recipeName of categorized[categoryName]) {
      imageSeries.push(
        <Image
          src={`/factorio-assets/${recipeName}.png`}
          alt={recipeName}
          width={iconSize}
          height={iconSize}
          onClick={(e) => {
            props.setTargetItem(recipeName);
          }}
        />
      );
    }
    displayBlock.push(<div className={styles.imageSeries}>{imageSeries}</div>);
  }

  return (
    <dialog id="itemChoice" className={styles.itemChoice}>
      <p onClick={closeItemChoice}>&#x274c;</p>
      {displayBlock}
    </dialog>
  );
}
