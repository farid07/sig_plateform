import React from 'react';
import {Flex} from "@chakra-ui/react";

const Container = ({children}) => {
    return (
        <Flex backgroundColor={"gray.100"} margin="0 auto" W={"100%"} minW={"full"} direction={"column"}
              ml={[6, 10]} mr={[6, 10]} overflowX={"visible"}>
            {children}
        </Flex>
    )
};

export default Container;