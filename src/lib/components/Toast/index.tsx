import {
  Button,
  ButtonGroup,
  CloseButton,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Notification } from '@lib/components/Notification';

export const TxToast = ({ message, body, url, closeAll }: any) => {
  return (
    <Notification>
      <Stack direction="row" p="4" spacing="3">
        <Stack spacing="2.5">
          <Stack spacing="1">
            <Text fontSize="md" color="light.900" fontWeight="medium">
              {message}
            </Text>
            <Text fontSize="sm" color="gray.900">
              {body}
            </Text>
          </Stack>
          <ButtonGroup variant="link" size="sm" spacing="2">
            <Button color="secondary.900" as="a" target="_blank" href={url}>
              View transaction
            </Button>
          </ButtonGroup>
        </Stack>
        <CloseButton
          aria-label="close"
          transform="translateY(-6px)"
          color="white"
          onClick={closeAll}
        />
      </Stack>
    </Notification>
  );
};
