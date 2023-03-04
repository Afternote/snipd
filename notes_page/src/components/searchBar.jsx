import { useState, useEffect } from "react";
import { TextInput, Button, Container, Flex } from "@mantine/core";

const MantineSearchBar = ({ onSearch }) => {
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
          <TextInput placeholder="Search" value={searchQuery} onChange={handleSearchInputChange} />
          <Button onClick={() => onSearch(searchQuery)}>Search</Button>
        </Flex>
      </Container>
    </>
  );
};

export default MantineSearchBar;
