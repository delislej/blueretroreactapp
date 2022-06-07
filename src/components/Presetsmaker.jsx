import React, { useState, useEffect } from "react";
import Select from "react-select";
//import { brUuid } from "./Btutils";
//import { ChromeSamples } from "./Logbox";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
//import { useGamepads } from 'awesome-react-gamepads';
//var bluetoothDevice;
import { btnList } from "../utils/constants";

const Presetsmaker = () => {
  const controllers = [
    "Default",
    "Keyboard",
    "Mouse",
    "PS3",
    "PS4 / PS5",
    "Wiimote",
    "Wiimote + Classic",
    "Wiimote + Nunchuck",
    "WiiU / Switch Pro",
    "Switch NES",
    "Switch SNES",
    "Switch MD / Genesis",
    "Switch N64",
    "Switch Joycon",
    "Xbox One/X|S",
    "Steam",
  ];
  const gameConsoleControllers = [
    "NeoGeo (Parallel 1P)",
    "PCE",
    "PCE 6 btns",
    "NES",
    "SNES",
    "CD-i",
    "JVS",
    "3DO",
    "Jaguar",
    "Jaguar 6D",
    "PC-FX",
    "VB",
    "N64",
    "GameCube",
    "Atari / SMS",
    "MD / Genesis",
    "Saturn",
    "Dreamcast",
    "PSX / PS2",
  ];
  const [controller, setController] = useState([]);
  const [controllerOptions, setControllerOptions] = useState([]);
  const [gcControllerOptions, setGcControllerOptions] = useState([]);
  const [selectedController, setSelectedController] = useState(-1);
  const [selectedGameConsoleController, setSelectedGameConsoleController] =
    useState(-1);
  const [consoleController, setConsoleController] = useState([]);
  const [selects, setSelects] = useState(null);

  useEffect(() => {
    var cons = controllers.map(function (value, index) {
      return { value: index, label: value };
    });
    setControllerOptions(cons);

    var gcCons = gameConsoleControllers.map(function (value, index) {
      return { value: index, label: value };
    });
    setGcControllerOptions(gcCons);
  }, []);

  const handleGcControllerChange = (gcCon) => {
    console.log(gcCon.value);
    setSelectedGameConsoleController(gcCon.value + 16)
    var gameConsoleController = btnList.map(function (value, index) {
      return { value: index, label: value[gcCon.value + 16], bindings: [] };
    });
    console.log(gameConsoleController);
    var temp = [];
    for (let i = 0; i < gameConsoleController.length; i++) {
      if (gameConsoleController[i].label === "") {
        continue;
      } else {
        temp.push(gameConsoleController[i]);
      }
    }
    console.log(temp);
    setConsoleController(temp);
  }

  const handleControllerChange = (con) => {
    setSelectedController(con.value)
    var bluetoothController = btnList.map(function (value, index) {
      return { value: index, label: value[con.value] };
    });
    var temp2 = [];
    for (let i = 0; i < bluetoothController.length; i++) {
      if (bluetoothController[i].label === "") {
        continue;
      } else {
        temp2.push(bluetoothController[i]);
      }
    }
    console.log(temp2);
    setController(temp2);
  }

  const handleButtonBind = (index, bindings) =>{
    console.log("index: " +index);
    console.log("bindings: ");
    console.log(bindings);
    console.log(consoleController[index]);
    var temp = consoleController;
    temp[index].bindings=bindings;
    setConsoleController(temp);
  }

  const createSelects = (gcCon, con) => {
    //console.log(controllers.length);
    console.log("gcCon: " + gcCon + " " + "Con: " + con);
    if(gcCon === -1 || con === -1)
    { return null;}
    
    var selectTemp = [];
    consoleController.forEach((element, index) => {
      selectTemp.push(
        <form key={index}>
          <label id="aria-label" htmlFor="aria-example-input">
            {element.label}
          </label>
          <Select
            defaultValue={element.value}
            isMulti
            isClearable={false}
            name="colors"
            options={controller}
            onChange={(x)=>{handleButtonBind(index, x);}
          
          }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </form>
      );
    });
    setSelects(selectTemp);
    console.log(consoleController);
  };

  const printBindings = () => {
    console.log(consoleController);
  }

  return (
    <Box>
      <Typography>Bindings</Typography>
      <Select
        defaultValue={""}
        name="colors"
        options={gcControllerOptions}
        onChange={(x)=>{handleGcControllerChange(x)}}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <Select
        defaultValue={""}
        name="colors"
        options={controllerOptions}
        onChange={(x)=>{handleControllerChange(x)}}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <Button
        onClick={() => {
          createSelects(selectedGameConsoleController, selectedController);
        }}
      >
        print test
      </Button>
      {selects}
      <Button
        onClick={() => {
          printBindings();
        }}
      >
        Print Bindings
      </Button>
    </Box>
  );
};

export default Presetsmaker;
