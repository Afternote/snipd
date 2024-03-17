import { useState, useEffect } from "react";
import { TextInput, Button, Container, Flex, ActionIcon } from "@mantine/core";
import { IconZoomFilled, IconSearch, IconPrinter } from "@tabler/icons-react";

const MantineSearchBar = ({ onSearch, print }) => {
  // console.log(someProp);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //   const handleSearchClick = () => {
  //     console.log(`Searching for "${searchQuery}"...`);

  //     let x = someProp.filter((a)=>{if(a.content.includes(searchQuery.toLowerCase())){return a}});

  //     console.log(x);
  //   };

  return (
    <>
      <Container m={10}>
        <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
          <TextInput
            radius="lg"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <ActionIcon onClick={() => onSearch(searchQuery)} size="lg" color="blue" variant="filled"  radius="xl" aria-label="Settings">
            <IconSearch style={{ color: "white", width: "70%", height: "70%" }}  />
          </ActionIcon>
          <ActionIcon onClick={() => print()} size="lg" color="blue" variant="filled"  radius="xl" aria-label="Settings">
            <IconPrinter style={{ color: "white", width: "70%", height: "70%" }}  />
          </ActionIcon>
          
        </Flex>
      </Container>
    </>
  );
};

export default MantineSearchBar;
