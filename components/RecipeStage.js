import React from "react";
import Image from "next/image";
import utilStyles from "../src/app/page.module.css";
import styles from "./RecipeStage.module.css";
import RecipeItem from "./RecipeItem";
import { toFactories, inputFor } from "../domain/Calculations";

function RecipeStage(props) {
  // A RecipeStage effectively corresponds to a row in the table of results
  const input = inputFor(props["IPS"], props["item"]);
  return (
    <>
      <div>
        {props["showCancel"] ? (
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
        item={props["item"]}
        IPS={props["IPS"]}
        displayUnit="IPS"
        clickable={false}
      />
      <div>{toFactories(props.IPS, props.item, "Assembling_machine_1")}</div>
      <div className={styles.inputList}>
        {input.map((elem, i) => {
          return (
            <RecipeItem
              item={elem.item}
              IPS={elem.IPS}
              displayUnit="IPS"
              clickable={elem.sub_recipe}
              key={`${props["id"]}-${i}`}
              addStage={props["addStage"]}
            />
          );
        })}
      </div>
    </>
  );
}

export default RecipeStage;
