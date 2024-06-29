import styled from "styled-components";
import { booleanConverter } from "../helpers/booleanConverter";
import { useEffect } from "react";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--primary-border-color);
  color: var(--primary-font-color);
  font-size: 18px;

  padding: 24px;
  height: 40px;
`;

const RowValue = styled.span`
  color: inherit;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--secondary-font-color);
  text-transform: capitalize;
`;

function DetailsTable({ product }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    category,
    body,
    stringsNumber,
    pickups,
    neck,
    bridgePickup,
    neckPickup,
    middlePickup,
    fretsNumber,
    pickupsActive,
    lefthanded,
    subcategory,
    inventory,
    effectsProcessor,
    channels,
    memorySlots,
    power,
    footSwitchConnection,
    headphoneOutput,
    reverb,
    recordingOutput,
    output,
    active,
    pickup,
    wiring,
    pickupStringsNumber,
    kappe,
    effects,
    ampModeling,
    drumComputer,
    auxPort,
  } = product;

  return (
    <>
      <Row>
        Category
        <RowValue>{subcategory}</RowValue>
      </Row>
      <Row>
        Avaliable
        <RowValue>{inventory > 0 ? "Yes" : "No"}</RowValue>
      </Row>
      {category === "guitar" && (
        <Row>
          Body<RowValue>{body && body}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          {" "}
          Effects processor
          <RowValue>{booleanConverter(effectsProcessor)}</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Output
          <RowValue>{output && output}</RowValue>
        </Row>
      )}
      {category === "multi effect" && (
        <Row>
          {" "}
          Effects
          <RowValue>{booleanConverter(effects)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Neck <RowValue>{neck && neck}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Power
          <RowValue>{power && power} W</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Active
          <RowValue>{booleanConverter(active)}</RowValue>
        </Row>
      )}
      {category === "multi effect" && (
        <Row>
          {" "}
          AMP modeling
          <RowValue>{booleanConverter(ampModeling)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Pickups <RowValue>{pickups ? pickups : "No Pickup"}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Memory slots
          <RowValue>{memorySlots && memorySlots}</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Pickup
          <RowValue>{pickup && pickup}</RowValue>
        </Row>
      )}
      {category === "multi effect" && (
        <Row>
          {" "}
          Drum computer
          <RowValue>{booleanConverter(drumComputer)}</RowValue>
        </Row>
      )}

      {category === "guitar" && (
        <Row>
          Frets <RowValue>{fretsNumber && fretsNumber}</RowValue>
        </Row>
      )}

      {category === "amplifier" && (
        <Row>
          Channels
          <RowValue>{channels && channels}</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Wiring
          <RowValue>{wiring && wiring}</RowValue>
        </Row>
      )}
      {category === "multi effect" && (
        <Row>
          {" "}
          AUX port
          <RowValue>{booleanConverter(auxPort)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Pickups active <RowValue>{booleanConverter(pickupsActive)}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Foot Switch Connection
          <RowValue>{booleanConverter(footSwitchConnection)}</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Pickup Strings Number
          <RowValue>{pickupStringsNumber && pickupStringsNumber}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Lefthanded <RowValue>{booleanConverter(lefthanded)}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Headphone output
          <RowValue>{booleanConverter(headphoneOutput)}</RowValue>
        </Row>
      )}
      {category === "pickup" && (
        <Row>
          {" "}
          Kappe
          <RowValue>{booleanConverter(kappe)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Bridge pickup <RowValue>{booleanConverter(bridgePickup)}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Reverb
          <RowValue>{booleanConverter(reverb)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Neck pickup <RowValue>{booleanConverter(neckPickup)}</RowValue>
        </Row>
      )}
      {category === "amplifier" && (
        <Row>
          Recording output
          <RowValue>{booleanConverter(recordingOutput)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Middle pickup <RowValue>{booleanConverter(middlePickup)}</RowValue>
        </Row>
      )}
      {category === "guitar" && (
        <Row>
          Strings <RowValue>{stringsNumber && stringsNumber}</RowValue>
        </Row>
      )}
    </>
  );
}

export default DetailsTable;
