import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'

// Define the keyframes for the scrolling effect
const scrollKeyframes = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

export default function Headlines(props) {
    const { headlines } = props;



    if (!headlines || headlines.length === 0) {
        return (
            <Box overflow="hidden" h="50px" width="60%">
                <Box
                    display="flex"
                    css={{
                        animation: `${scrollKeyframes} 35s linear infinite`,
                        width: 'max-content',
                    }}
                >
                    {Array(5).fill().map((_, index) => {
                        return (
                            <Box key={index} whiteSpace="nowrap" mr={index === 4 ? "" : "40px"}>
                                Select City and Date to Generate Headlines
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        )
    }

    return (
        <Box overflow="hidden" h="50px" width="60%">
            <Box
                display="flex"
                css={{
                    animation: `${scrollKeyframes} 25s linear infinite`,
                    width: 'max-content',
                }}
            >
                {headlines.map((headline, index) => (
                    <Box key={index} whiteSpace="nowrap" mr={index === 4 ? "" : "40px"} >
                        {headline}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

