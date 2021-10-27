import {Box, Button, Flex, Stack, Icon} from '@chakra-ui/react';
import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from "@chakra-ui/react"

const Login = () => {
    const auth = useAuth();

    return (
        <Flex
            align="center"
            justify="center"
            h="100vh"
            backgroundColor={['white', 'gray.100']}
        >
            <Stack
                backgroundColor="white"
                borderRadius={[0, 8]}
                maxWidth="400px"
                px={8}
                py={12}
                shadow={[null, 'md']}
                spacing={4}
                w="100%"
            >
                <Flex justify="center">
                    {/*  <Box as="a" href="/" aria-label="Back to homepage">
                        <Icon color="black" name="logo" size="56px" mb={4}/>
                    </Box> */}
                    <p> SIGN IN</p>
                </Flex>

                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl id="password">
                    <FormLabel>Password </FormLabel>
                    <Input type="password" />
                    <FormHelperText>We'll never share your password.</FormHelperText>
                </FormControl>

                <Button
                    onClick={() => auth.signinWithGoogle('/sites')}
                    backgroundColor="#005cc5"
                    color="gray.900"
                    variant="outline"
                    fontWeight="medium"
                    mt={2}
                    h="50px"
                    _hover={{bg: 'gray.100'}}
                    _active={{
                        bg: 'gray.100',
                        transform: 'scale(0.95)'
                    }}
                >
                    Connexion
                </Button>

            </Stack>
        </Flex>
        
    );
};

const LoginPage = () => (
    <Page name="Login" path="/login">
        <Login/>
    </Page>
);

export default LoginPage;
