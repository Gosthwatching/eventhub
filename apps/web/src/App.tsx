import { useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loadEvents, RootState } from './store';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    void dispatch(loadEvents());
  }, [dispatch]);

  return (
    <Box minH="100vh">
      <Box bg="#102c27" color="white" py={{ base: 12, md: 16 }}>
        <Container maxW="6xl">
          <Text color="#c7e86b" fontSize="sm" fontWeight="bold" mb={4}>
            AGENDA COMMUNAUTAIRE
          </Text>
          <Heading
            fontFamily="Georgia, serif"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="medium"
          >
            Vos prochains rendez-vous.
          </Heading>
          <Text color="whiteAlpha.800" fontSize="lg" mt={4} maxW="2xl">
            Conferences, ateliers et rencontres pour faire avancer les idees.
          </Text>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 10, md: 14 }}>
        <HStack
          justify="space-between"
          align="end"
          borderBottom="1px solid"
          borderColor="gray.300"
          pb={5}
          mb={2}
        >
          <Box>
            <Text color="#a44832" fontSize="sm" fontWeight="bold" mb={1}>
              LE PROGRAMME
            </Text>
            <Heading
              fontFamily="Georgia, serif"
              fontSize="3xl"
              fontWeight="medium"
            >
              Evenements a venir
            </Heading>
          </Box>
          {status === 'idle' && (
            <Badge colorScheme="green">{items.length} evenements</Badge>
          )}
        </HStack>

        {status === 'loading' && (
          <Spinner label="Chargement des evenements" mt={8} />
        )}
        {status === 'failed' && (
          <Alert status="error" mt={6}>
            <AlertIcon /> Impossible de charger le programme. Verifiez que l'API
            EventHub fonctionne.
          </Alert>
        )}
        {status === 'idle' && (
          <Stack spacing={0}>
            {items.map((event) => (
              <HStack
                key={event.id}
                align="center"
                justify="space-between"
                gap={6}
                py={6}
                borderBottom="1px solid"
                borderColor="gray.200"
                flexWrap="wrap"
              >
                <Box minW={0} flex="1 1 18rem">
                  <Text color="#a44832" fontSize="sm" fontWeight="bold">
                    {event.category} · {event.location}
                  </Text>
                  <Heading
                    fontFamily="Georgia, serif"
                    fontSize="xl"
                    fontWeight="medium"
                    mt={1}
                  >
                    {event.title}
                  </Heading>
                </Box>
                <Text color="gray.600" fontSize="sm" flexShrink={0}>
                  {dateFormatter.format(new Date(event.date))}
                </Text>
              </HStack>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
