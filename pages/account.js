import {useState} from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text
} from '@chakra-ui/react';

import {useAuth} from '@/lib/auth';
// import { goToBillingPortal } from '@/lib/db';
import Page from '@/components/Page';
import DashboardShell from '@/layouts/DashboardShell';
import UpdateProfilModal from "@/components/UpdateProfilModal";

const FeedbackUsage = () => (
    <StatGroup>
        <Stat>
            <StatLabel color="gray.700">Feedback</StatLabel>
            <StatNumber fontWeight="medium">∞</StatNumber>
            <StatHelpText>10,000 limit</StatHelpText>
        </Stat>

        <Stat>
            <StatLabel color="gray.700">Sites</StatLabel>
            <StatNumber fontWeight="medium">1/∞</StatNumber>
            <StatHelpText>Unlimited Sites</StatHelpText>
        </Stat>
    </StatGroup>
);

const SettingsTable = ({userRole, children}) => (
    <Box
        backgroundColor="white"
        mt={8}
        borderRadius={[0, 8, 8]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
        <Flex
            backgroundColor="gray.50"
            borderTopLeftRadius={[0, 8, 8]}
            borderTopRightRadius={[0, 8, 8]}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            px={6}
            py={4}
        >
            <Flex justify="space-between" align="center" w="full">
                <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="medium"
                    mt={1}
                >
                    Paramètres du compte
                </Text>
                <Badge h="1rem" variant="blue">
                    {userRole}
                </Badge>
            </Flex>
        </Flex>
        <Flex direction="column" p={6}>
            {children}
        </Flex>
    </Box>
);

const Account = () => {
    const {authUser, signOut} = useAuth();
    const [isBillingLoading, setBillingLoading] = useState(false);
    return (
        <DashboardShell>
            <Flex
                mt={6}
                direction="column"
                maxW="860px"
                align={['left', 'center']}
                margin="0 auto"
            >
                <Flex direction="column" align={['left', 'center']} ml={4}>
                    <Avatar
                        w={['3rem', '6rem']}
                        h={['3rem', '6rem']}
                        mb={4}
                        src={authUser?.photoUrl}
                    />
                    <Heading as={"h1"} fontSize={"32px"} my={"4px"} letterSpacing="-1px">{authUser?.last_name}</Heading>
                    <Heading as={"h1"} fontSize={"32px"} my={"4px"}
                             letterSpacing="-1px">{authUser?.first_name}</Heading>
                    <Text>{authUser?.email}</Text>
                </Flex>
                <SettingsTable userRole={authUser?.accountType}>
                    <Text my={4}>

                    </Text>
                    <Flex justify={"flex-start"}>

                    </Flex>
                    <Flex justify="flex-end">
                        <Button variant="ghost" ml={4} onClick={() => signOut()}>
                            Déconnexion
                        </Button>
                        <UpdateProfilModal user={authUser}/>
                    </Flex>
                </SettingsTable>
            </Flex>
        </DashboardShell>
    );
};

const AccountPage = () => (
    <Page name="Account" path="/account">
        <Account/>
    </Page>
);

export default AccountPage;
