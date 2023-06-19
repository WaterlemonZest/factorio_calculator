"use client";
import Image from "next/image";
import utilStyles from "./page.module.css";
import RecipeStage from "../../components/RecipeStage";
import { toIPS, inputFor, toUnit } from "../../domain/Calculations";
import { useState } from "react";

// @TODO: read up on Typescript and change the file extensions accordingly
// @TODO: clean up the object.attribute vs object["attribute"] references
// @TODO: couple the stages so that input changes cascade all the way through

const DEFAULT_ITEM = "Automation_science_pack";
const DEFAULT_IPS = 10;
const DEFAULT_STAGE0 = {
  item: DEFAULT_ITEM,
  IPS: DEFAULT_IPS,
  displayUnit: "IPS",
  id: "0",
  input: inputFor(DEFAULT_IPS, DEFAULT_ITEM),
};

export default function Home() {
  // **** Hook definitions and custom functions
  const [stages, setStages] = useState([DEFAULT_STAGE0]);
  function setStage0Unit(newDisplayUnit) {
    setStages([
      {
        ...stages[0],
        displayUnit: newDisplayUnit,
      },
      ...stages.slice(1),
    ]);
  }
  function setStage0Quantity(e) {
    setStages([
      {
        ...stages[0],
        IPS: toIPS(e.target.value, stages[0].displayUnit),
      },
      ...stages.slice(1),
    ]);
  }
  function addStage(newStage) {
    // make sure a stage with this id is not already present
    if (!stages.find((stage) => stage.id === newStage.id)) {
      newStage["input"] = inputFor(newStage.IPS, newStage.item);
      setStages([...stages, newStage]);
    }
  }
  function deleteStage(id) {
    ``;
    setStages(stages.filter((stage) => stage.id !== id));
  }
  const stageList = stages.map((stage, i) => (
    <RecipeStage
      item={stage["item"]}
      IPS={stage["IPS"]}
      displayUnit={stage["displayUnit"]}
      input={stage["input"]}
      showCancel={i !== 0}
      key={stage["id"]}
      addStage={addStage}
      deleteStage={deleteStage}
    />
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
              src={`/factorio-assets/${stages[0]["item"]}.png`}
              alt={stages[0]["item"]}
              className={`${utilStyles.recipeDemandIcon} ${utilStyles.iconClickable}`}
              width={targetIconSize}
              height={targetIconSize}
            />
            <form>
              <input
                type="text"
                className={utilStyles.recipeDemandQuantity}
                defaultValue={toUnit(
                  stages[0]["displayUnit"],
                  stages[0]["IPS"]
                )}
                onChange={(e) => {
                  setStage0Quantity(e);
                }}
              />
            </form>
            {/* @TODO: implement "activated" and "not active" states visually
            by conditionally applying an appropriate class?
            Or maybe look up how a similar thing with <a::clicked> is implemented? */}
            <Image
              src="/IPS.png"
              alt="items/s"
              className={utilStyles.iconClickable}
              width={targetIconSize}
              height={targetIconSize}
              onClick={() => {
                setStage0Unit("IPS");
              }}
            />
            <Image
              src="/factorio-assets/Transport_belt.png"
              alt="Transport belt"
              className={utilStyles.iconClickable}
              width={targetIconSize}
              height={targetIconSize}
              onClick={() => {
                setStage0Unit("Transport_belt");
              }}
            />
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
