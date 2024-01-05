/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Box,
  ButtonGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
// Components
// import { AssetTable } from '@lib/components/AssetTable';
import { motion } from 'framer-motion';

import { SectionHeader } from '@lib/components/SectionHeader';
import { Wrapper } from '@lib/components/Wrapper';
// Animation
import { FADE_IN_VARIANTS } from '@utils/animation';

const DAODashboard = () => {
  return (
    <motion.div
      variants={FADE_IN_VARIANTS}
      initial={FADE_IN_VARIANTS.hidden}
      animate={FADE_IN_VARIANTS.enter}
      exit={FADE_IN_VARIANTS.exit}
      transition={{ duration: 1, type: 'linear' }}
    >
      <Wrapper>
        <SectionHeader justify="flex-start" align="center" color="white">
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              Assets
            </Text>
            <Text color="gray.900" fontSize="sm">
              List of shared assets owned by the DAO
            </Text>
          </Box>
        </SectionHeader>

        <Tabs color="white" variant="unstyled">
          <TabList>
            <ButtonGroup bg="base.800" borderRadius="lg" p="1">
              {['Coins', 'Collectibles'].map((item) => (
                <Tab
                  key={item}
                  fontSize="sm"
                  borderRadius="lg"
                  color="gray.900"
                  px="5"
                  w="50%"
                  _selected={{ bg: 'base.500', color: 'light.900' }}
                >
                  {item}
                </Tab>
              ))}
            </ButtonGroup>
          </TabList>
          <TabPanels>
            <TabPanel px="0">
              {/* <AssetTable color="light.900" size="md" type="fungible" /> */}
            </TabPanel>
            <TabPanel px="0">
              {/* <AssetTable color="light.900" size="md" type="nonFungible" /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Wrapper>
    </motion.div>
  );
};

export default DAODashboard;
