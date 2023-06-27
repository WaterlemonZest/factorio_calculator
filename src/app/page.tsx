"use client";
import Image from "next/image";
import utilStyles from "./page.module.css";
import RecipeStage from "../../components/RecipeStage";
import RecipeItem from "../../components/RecipeItem";
import Popup from "reactjs-popup";
import popupStyles from "../../components/ChoiceBoxSmall.module.css";
import ChoiceBoxSmall from "../../components/ChoiceboxSmall";
import {
  toIPS,
  inputFor,
  toUnit,
  RATE_UNITS,
  RATE_ICONS,
} from "../../domain/Calculations";
import { useState, ChangeEvent } from "react";

import choiceboxSStyles from "../../components/ChoiceboxSmall.module.css";
import { text } from "stream/consumers";

export interface Stage {
  item: string;
  IPS: number;
  displayUnit: keyof typeof RATE_UNITS;
  id: string;
}
const DEFAULT_STAGE0: Stage = {
  item: "Logistic_science_pack",
  IPS: 15,
  displayUnit: "Transport_belt",
  id: "0",
};
export type AddStageSignature = { (newStage: Stage): void };
export type DeleteStageSignature = { (id: string): void };

export default function Home() {
  // **** Hook definitions and custom functions
  const [stages, setStages] = useState([
    {
      ...DEFAULT_STAGE0,
      input: inputFor(DEFAULT_STAGE0.IPS, DEFAULT_STAGE0.item),
    },
  ]);
  function rescaleStages(scale: number) {
    let rescaledStages = [];
    for (const stage of stages) {
      rescaledStages.push({
        ...stage,
        IPS: stage.IPS * scale,
        input: stage.input.map((elem) => {
          return { ...elem, IPS: elem.IPS * scale };
        }),
      });
    }
    return rescaledStages;
  }
  function setStageUnit(
    stageID: string,
    newDisplayUnit: keyof typeof RATE_UNITS
  ) {
    const oldDisplayUnit = stages.filter((stage) => stage.id === stageID)[0]
      .displayUnit;
    const scale = toIPS(1, newDisplayUnit) / toIPS(1, oldDisplayUnit);
    const rescaledStages = rescaleStages(scale);
    const updatedStages = rescaledStages.map((stage) => {
      if (stage.id === stageID) {
        return { ...stage, displayUnit: newDisplayUnit };
      }
      return stage;
    });
    setStages(updatedStages);
  }
  function setStage0Quantity(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value || Number(e.target.value) === 0) {
      // Prevent the user from setting a 0 value
      // because then recipe rescaling breaks
      return;
    }
    const newIPS = toIPS(Number(e.target.value), stages[0].displayUnit);
    const scale = newIPS / stages[0].IPS;
    setStages(rescaleStages(scale));
  }
  const addStage: AddStageSignature = function (newStage) {
    // make sure a stage with this id is not already present
    if (!stages.find((stage) => stage.id === newStage.id)) {
      // Declare a copy of the input object
      // because typescript gets angry for adding a new property
      // that is not defined in the interface
      const newStageWithInput = {
        ...newStage,
        input: inputFor(newStage.IPS, newStage.item),
      };
      setStages([...stages, newStageWithInput]);
    }
  };
  const deleteStage: DeleteStageSignature = function (id) {
    // delete the stage and its children
    setStages(stages.filter((stage) => !stage.id.startsWith(id)));
  };
  const stageList = stages.map((stage, i) => (
    <RecipeStage
      item={stage.item}
      IPS={stage.IPS}
      displayUnit={stage.displayUnit}
      showCancel={i !== 0}
      id={stage.id}
      key={stage.id}
      deleteStage={deleteStage}
    >
      {/* Approach of "composition" of children objects: */}
      {stage.input.map((elem, i) => {
        return (
          <RecipeItem
            item={elem.item}
            IPS={elem.IPS}
            displayUnit="IPS"
            clickable={elem.sub_recipe}
            id={`${stage.id}-${i}`}
            key={`${stage.id}-${i}`}
            addStage={addStage}
          />
        );
      })}
    </RecipeStage>
  ));

  // **** Contents of the site
  const targetIconSize = 48;
  return (
    <main className={utilStyles.main}>
      <div className={utilStyles.endbars}>
        <p>Top endbar - fixed</p>
      </div>

      <div className={utilStyles.pageContent}>
        <div className={utilStyles.recipeDemand}>
          <h1>TARGET PRODUCTION</h1>
          <div className={utilStyles.recipeDemandInput}>
            {/* @TODO: implement UI to change the target item */}
            <Image
              src={`/factorio-assets/${stages[0].item}.png`}
              alt={stages[0].item}
              className={`${utilStyles.recipeDemandIcon} ${utilStyles.iconClickable}`}
              width={targetIconSize}
              height={targetIconSize}
            />
            <form>
              <input
                type="number"
                className={utilStyles.recipeDemandQuantity}
                defaultValue={toUnit(stages[0].displayUnit, stages[0].IPS)}
                onChange={(e) => {
                  setStage0Quantity(e);
                }}
              />
            </form>
            {/* @TODO: figure out how to auto close this popup
            after clicking one of the options in the popup */}

            <Popup
              trigger={
                <Image
                  src={RATE_ICONS[stages[0].displayUnit]}
                  alt={stages[0].displayUnit}
                  className={utilStyles.iconClickable}
                  width={targetIconSize}
                  height={targetIconSize}
                />
              }
              className={popupStyles.popup}
              position="bottom center"
              closeOnDocumentClick
            >
              <ChoiceBoxSmall
                choices={RATE_ICONS}
                setStageUnit={setStageUnit}
                stageID={stages[0].id}
              />
            </Popup>
          </div>
        </div>
        <div className={utilStyles.recipeResults}>
          <div>&nbsp;</div>
          <div>item</div>
          <div>factories</div>
          <div>input</div>
          {stageList}
        </div>
      </div>

      <div className={utilStyles.endbars}>
        <p>Bottom endbar - fixed</p>
      </div>
    </main>
  );
}
