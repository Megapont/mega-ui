import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BoxProps, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';

// Components
import { Card } from '@lib/components/Card';

// Icons
import { FiArrowUpRight } from 'react-icons/fi';

import { motion } from 'framer-motion';

interface Props extends BoxProps {
  path: string;
  label: string;
  value: any;
  assetSymbol?: string;
  info: string;
}

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

export const Stat = (props: Props) => {
  const { path, label, value, assetSymbol, info, ...boxProps } = props;
  const [isHovered, setHovered] = useState(false);

  const pathname = usePathname();

  const currentPath = pathname.split('/').filter((p) => p === path)[0];
  const isActivePath = currentPath === path;
  return (
    <Link passHref href={`/dashboard/${path}`}>
      <Card
        bg="base.800"
        minW="20vw"
        borderColor="base.500"
        px={{ base: '4', md: '6' }}
        py={{ base: '4', md: '6' }}
        {...(isActivePath && {
          borderBottomColor: 'secondary.900',
          borderBottomWidth: '1px',
          borderBottomRadius: 'sm',
        })}
        {...boxProps}
        _hover={{
          cursor: 'pointer',
          borderBottomColor: 'secondary.900',
          borderBottomWidth: '1px',
          borderBottomRadius: 'sm',
        }}
      >
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <Stack>
            <HStack justify="space-between" h="2.5vh">
              <Text fontSize="sm" color="gray.900">
                {label}
              </Text>
              {isHovered && (
                <motion.div
                  variants={FADE_IN_VARIANTS}
                  initial={FADE_IN_VARIANTS.hidden}
                  animate={FADE_IN_VARIANTS.enter}
                  exit={FADE_IN_VARIANTS.exit}
                  transition={{ duration: 0.5, type: 'linear' }}
                >
                  <Icon as={FiArrowUpRight} boxSize="5" color="light.900" />
                </motion.div>
              )}
            </HStack>
            <Stack align="space-between">
              <Heading size="xs" fontWeight="medium">
                {value}{' '}
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="regular"
                  color="gray.900"
                >
                  {assetSymbol}
                </Text>
              </Heading>
              <Text fontSize="sm" fontWeight="regular" color="light.900">
                {info}
              </Text>
            </Stack>
          </Stack>
        </motion.div>
      </Card>
    </Link>
  );
};
