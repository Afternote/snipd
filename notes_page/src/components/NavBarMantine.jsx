import React from "react";
import {
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  rem,
} from "@mantine/core";
import { SnipdButton } from "./SnipdButton";
import "../styles/NavbarSearchStyle.css";

const NavBarMantine = () => {
  return (
  <nav className="navbar">
    <SnipdButton style={{ center: true, maxWidth: 320 }} />
  </nav>)
};

export default NavBarMantine;
