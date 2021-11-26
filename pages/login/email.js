import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast} from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import {useState} from 'react';

import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
import {getFirebaseErrors} from "@/utils/errors";
import Router from "next/router";

const Login = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {authUser, signInWithEmailAndPassword} = useAuth();
  const {handleSubmit, register, formState: {errors,  isValid, isDirty}} = useForm({mode: "onChange"});

  if(authUser){
    Router.push("/dashboard");
  }

  const OnLogin = ({ email, password }) => {
    setLoading(true);
    signInWithEmailAndPassword(email, password).catch((error) => {
      setLoading(false);
      const error_translate = getFirebaseErrors(error);
      toast({
        title: error_translate.title.FR,
        description: error_translate.message.FR,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    });
  };

  //
  // useEffect(() => {
  //   if(authUser){
  //     Router.push("/dashboard");
  //   }
  // }, [authUser])

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => OnLogin(data))}
        px={8}
        py={8}
        {...register}
        shadow={[null, 'md']}
        spacing={5}
        w="100%"
      >
        <Flex justify="center">
          <Box as="p" fontSize={"24px"} fontWeight={"bold"} fontStyle={"normal"}>
            Connexion
          </Box>
        </Flex>
        <FormControl isInvalid={errors?.email && errors?.email.message}>
          <FormLabel>Email</FormLabel>
          <Input
            autoFocus={true}
            aria-label="Adresse Email"
            id="email"
            autoComplete={"email"}
            name="email"
            {...register("email",{
              required: 'Entrez votre email.',
              validate: true
            })}
            placeholder="name@site.com"
          />
          <FormErrorMessage>
            {errors?.email && errors?.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.password && errors?.password.message}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            aria-label="Password"
            name="password"
            autoComplete={"password"}
            id="password"
            mb={6}
            type="password"
            {...register("password", {
              required: "Entrez votre mot de passe!",
              minLength: {
                value: 8,
                message: "Le mot de passe doit être de 8 caractères minimum !"
              }
            })}
          />
          <FormErrorMessage>
            {errors?.password && errors?.password.message}
          </FormErrorMessage>
        </FormControl>
        <Stack as={"div"}  mt={8}>
          <Button
            id="login"
            type="submit"
            backgroundColor="gray.900"
            color="white"
            isLoading={loading}
            fontWeight="medium"
            h="50px"
            fontSize="lg"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Se connecter
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => (
  <Page name="Login" path="/login/email">
    <Login />
  </Page>
);

export default LoginPage;
