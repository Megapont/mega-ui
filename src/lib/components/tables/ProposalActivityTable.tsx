import {
  HStack,
  Table,
  TableContainer,
  Thead,
  Th,
  TableProps,
  Tbody,
  Td,
  Text,
  Tr,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

// Components
import { EmptyState } from '@lib/components/EmptyState';

// Utils
import { convertToken, truncate } from '@common/helpers';
import Avatar from 'boring-avatars';

// Queries
import { useEvents, useToken } from '@common/queries';

// Animation
import { motion } from 'framer-motion';
import { FADE_IN_VARIANTS } from '@utils/animation';
import { MEGA_VOTING_CONTRACT } from '@lib/common/constants';

type TProposalTableProps = {
  proposalPrincipal: string;
};

export const ProposalActivityTable = (
  props: TableProps & TProposalTableProps
) => {
  const voting = { contractAddress: MEGA_VOTING_CONTRACT };
  const { isLoading, isIdle, isError, token } = useToken();
  const { data: contractEvents } = useEvents(
    voting?.contractAddress,
    'vote',
    props?.proposalPrincipal,
    0
  );

  if (contractEvents?.length === 0) {
    return <EmptyState heading="No activity" />;
  }

  if (isLoading || isIdle) {
    return <EmptyState heading="Loading activity" />;
  }

  if (isError) {
    return <EmptyState heading="Error loading activity" />;
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <motion.div
        variants={FADE_IN_VARIANTS}
        initial={FADE_IN_VARIANTS.hidden}
        animate={FADE_IN_VARIANTS.enter}
        exit={FADE_IN_VARIANTS.exit}
        transition={{ duration: 1, type: 'linear' }}
      >
        <TableContainer>
          <Table {...props} bg="transparent">
            <Thead color="gray.900">
              <Tr>
                <Th bg="transparent" border="none">
                  Name
                </Th>
                <Th bg="transparent" border="none">
                  Tokens
                </Th>
                <Th bg="transparent" border="none">
                  Voter
                </Th>
                <Th bg="transparent" border="none">
                  Delegate
                </Th>
              </Tr>
            </Thead>
            <Tbody color="light.900">
              {contractEvents?.map((data: any, index: number) => {
                const from = data?.proposer?.value || data?.voter?.value;
                const weight = convertToken(
                  data?.amount?.value,
                  token?.decimals || 2
                );
                const isVoteFor = data?.for?.value;
                const delegate = data?.delegate?.value;
                return (
                  <Tr key={index} cursor="pointer">
                    <Td borderColor="base.500">
                      <HStack spacing="2">
                        <Avatar
                          size={10}
                          name={data?.event?.value}
                          variant="marble"
                          colors={[isVoteFor ? '#25C2A0' : '#E53E3E']}
                        />
                        <Stack spacing="0">
                          <Text color="light.900" size="xs">
                            {isVoteFor ? 'Approved' : 'Rejected'}
                          </Text>
                        </Stack>
                      </HStack>
                    </Td>
                    <Td borderColor="base.500">{weight}</Td>
                    <Td borderColor="base.500">
                      {from && truncate(from, 4, 4)}
                    </Td>
                    {delegate?.value ? (
                      <Td borderColor="base.500">
                        {delegate?.value && truncate(delegate?.value, 4, 4)}
                      </Td>
                    ) : (
                      <Td borderColor="base.500">NA</Td>
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </motion.div>
    </Skeleton>
  );
};
