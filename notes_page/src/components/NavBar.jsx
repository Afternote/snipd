import reactLogo from "../assets/snipdLogo.jpg";
import { Stack, Divider, Title, Center, NavLink, Navbar, Button } from "@mantine/core";

export default function ({categoryList, setSelectedCategories}) {
  return (
    <Navbar width={{ base: 280 }} fixed p={10} style={{ backgroundColor: "white" }}>
      <Center>
        <img src={reactLogo} width="100px" />
      </Center>

      <Title order={2} align="left" color={"green"} mt={10}>
        Collections
      </Title>
      <Divider mb={5} mt={5} />
      <Stack spacing={"xs"} color={"black"}>
      {categoryList.map(category => {
          return (<Button variant="subtle" color="dark">{category}</Button>);
      })} 
      </Stack>
    </Navbar>
  );
}

//        <Button variant="subtle" color="dark">
//          History Research
//        </Button>
//        <Button variant="subtle" color="dark">
//          Interesting Reddit Collection
//        </Button>
//        <Button variant="subtle" color="dark">
//          Cats
//        </Button>
