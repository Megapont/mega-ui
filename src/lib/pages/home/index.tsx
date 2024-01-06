/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Box, Button, Flex, Link, Stack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { Wrapper } from '@lib/components/Wrapper';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';
import { AppFooter } from '@lib/components/Footer';

const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 15 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -15 },
};

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        w="100%"
        p="3"
        px="9"
        bg="base.900"
        borderBottom="1px solid"
        borderColor="base.800"
        zIndex="2"
      >
        <Link href="/">
          <Flex justify="start" align="center" gap="2">
            <Image
              cursor="pointer"
              height="35px"
              src="/MEGA_DAO.png"
              alt="logo"
            />
          </Flex>
        </Link>
      </Box>

      <motion.div
        variants={SLIDE_UP_VARIANTS}
        initial={SLIDE_UP_VARIANTS.hidden}
        animate={SLIDE_UP_VARIANTS.enter}
        exit={SLIDE_UP_VARIANTS.exit}
        transition={{ duration: 0.75, type: 'linear' }}
      >
        <Box
          height="90vh"
          as="section"
          gap="2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Wrapper>
            <Stack
              spacing={{ base: '8', md: '10' }}
              align="center"
              justify="center"
              minH="xl"
              maxW="100vw"
            >
              <Box textAlign="center" maxW="90vw">
                <h1 className="mask">
                  From pixels to <span className="lisbeth-dao-text">power</span>
                  .
                </h1>

                <Stack
                  direction="row"
                  spacing={4}
                  align="center"
                  justify="center"
                >
                  <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    initial={SLIDE_UP_VARIANTS.hidden}
                    animate={SLIDE_UP_VARIANTS.enter}
                    exit={SLIDE_UP_VARIANTS.exit}
                    transition={{ duration: 0.8, type: 'linear' }}
                  >
                    <Stack>
                      <Button
                        marginTop={10}
                        variant="outline"
                        bgColor={'transparent'}
                        textColor={'white'}
                        colorScheme="base"
                        borderRadius="50px"
                        rightIcon={<FaAngleRight></FaAngleRight>}
                        onClick={() => router.push('/vault')}
                        px={5}
                        py={6}
                      >
                        Go to Dapp
                      </Button>
                    </Stack>
                  </motion.div>
                </Stack>
              </Box>
            </Stack>
          </Wrapper>
        </Box>
      </motion.div>
      <AppFooter />
    </>
  );
}
