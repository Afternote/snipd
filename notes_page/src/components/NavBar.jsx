import React from "react";
import { Stack, Divider, Title, Center, Navbar, Button } from "@mantine/core";
import "../assets/print.css";
import reactLogo from "../assets/snipdLogo.jpg";

const CustomNavbar = ({ categoryList, setSelectedCategory }) => {
  return (
    <Navbar
      className="nav-bar"
      width={{ base: 280 }}
      fixed
      p={10}
      style={{ backgroundColor: "white", maxHeight: "100vh", overflowY: "auto" }}
    >
      <Center>
        <img src={reactLogo} width="100px" alt="React Logo" />
      </Center>

      <Title order={2} align="left" color="green" mt={10}>
        Collections
      </Title>
      <Divider mb={5} mt={5} />
      <Stack spacing="xs" color="black">
        {categoryList.map((category) => (
          <Button
            key={category}
            variant="subtle"
            color="dark"
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category}
          </Button>
        ))}
      </Stack>
    </Navbar>
  );
};

export default CustomNavbar;
