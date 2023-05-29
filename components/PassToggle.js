import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PassToggle = () => {
  const [visible, setVisibility] = useState(false);
  const Icon = 
    <FontAwesomeIcon
      className="text-gray-400 text-sm"
      icon={visible ? "eye-slash" : "eye"}
      onClick={() => setVisibility(visibility => !visibility)}
    />
  ;
  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default PassToggle;
