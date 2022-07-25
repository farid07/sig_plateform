import * as React from 'react';
import {Box, List, ListItem, Text} from "@chakra-ui/react";

function EquipmentInfos(props) {
    const {info} = props;
    const displayName = `${info.name}, ${info.operatorName}`;

    return (
        <div>
            <div>
                {displayName} |{' '}
                <Box>
                    <Text
                        fontSize={{base: '16px', lg: '18px'}}
                        color={'teal.500'}
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        Détails
                    </Text>

                    <List spacing={2}>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Réseau:
                            </Text>{' '}
                            {info.operatorName}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Ports:
                            </Text>{' '}
                            {info.ports}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Ports Occupés:
                            </Text>{' '}
                            {info.portsOccupees}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Type:
                            </Text>{' '}
                            {info.type}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Type Câble:
                            </Text>{' '}
                            {info.typeCable}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Taille:
                            </Text>{' '}
                            {info.taille}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Lng. Départ:
                            </Text>{' '}
                            {info.longitude}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Lat. Départ:
                            </Text>{' '}
                            {info.latitude}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Lng. Arrviée:
                            </Text>{' '}
                            {info.longitudeArrivee}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Lat. Arrivée:
                            </Text>{' '}
                            {info.latitudeArrivee}
                        </ListItem>
                        <ListItem>
                            <Text as={'span'} fontWeight={'bold'}>
                                Marque:
                            </Text>{' '}
                            {info.mark}{' '}
                        </ListItem>
                    </List>
                </Box>
            </div>
        </div>
    );
}

export default React.memo(EquipmentInfos);