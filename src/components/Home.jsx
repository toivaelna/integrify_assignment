import React from "react";
import { useState, useEffect } from "react";
import {
  Flex,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log("Error:", err.message));
  }, []);

  const handleChangeInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <form>
        <Flex pr="50" pl="50" flexWrap={"wrap"}>
          <Box p="4">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={searchInput}
                onChange={handleChangeInput}
                type="text"
                placeholder="Search for a country "
              />
            </InputGroup>
          </Box>
          <Spacer />
        </Flex>
      </form>

      {data.length === 0 ? (
        <Progress colorScheme="pink" size="xs" isIndeterminate />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Flag</Th>
              <Th>Name</Th>
              <Th>Region</Th>
              <Th>Population</Th>
              <Th>Languages</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              .filter((x) =>
                x?.name?.common
                  ?.toLowerCase()
                  ?.includes(searchInput?.toLowerCase())
              )
              .sort((a, b) => {
                const nameA = a.name.common.toLowerCase();
                const nameB = b.name.common.toLowerCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .slice(0, page * limit)
              .map((x) => (
                <Tr
                  key={x.name.common}
                  onClick={() =>
                    navigate(`/singlecountry/${x.cca2.toLowerCase()}`)
                  }
                >
                  <Th>
                    <Image
                      src={x.flags.svg}
                      alt={x.name.common}
                      height="50px"
                    />
                  </Th>
                  <Th>{x.name.common}</Th>
                  <Th>{x.region}</Th>
                  <Th>{x.population.toLocaleString()}</Th>
                  <Th>
                    {x.languages && (
                      <ul>
                        {Object.values(x.languages).map((language, index) => (
                          <li key={index}>{language}</li>
                        ))}
                      </ul>
                    )}
                  </Th>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
      {data.length > 0 && (
        <Flex py="4" justify="center">
          <Button
            variantColor="pink"
            onClick={loadMore}
            size="md"
            isDisabled={data.length <= page * limit}
          >
            Load More
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Home;
