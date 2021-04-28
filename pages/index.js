import Head from 'next/head';
import { Box } from '@chakra-ui/react';

export default function Landing() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        Test
        {/* Protected content only visible to auhenticaed users
        <ProtectedRoute>
          Go to your <Link href='/dashboard/pages'>dashboard</Link>
        </ProtectedRoute>
        */}
      </Box>
    </>
  );
}
