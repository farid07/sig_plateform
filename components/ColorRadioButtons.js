import {Input} from "@chakra-ui/react";

const {useRadio, Box} = require("@chakra-ui/react");

export default function ColorRadioButtons(props) {
    const {getInputProps, getCheckboxProps} = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as='label' w='100%' h='100%'>
            <Input name='operator-color' {...input} />
            <Box
                {...checkbox}
                w='100%'
                h='50px'
                cursor='pointer'
                borderWidth='3px'
                borderRadius='12px'
                borderColor={props.color}
                bg='transparent'
                transition='all 200ms ease-in-out'
                _checked={{
                    bg: props.color,
                    borderColor: props.color
                }}
            />
        </Box>
    );
}