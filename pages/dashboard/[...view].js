import { Box } from "@chakra-ui/react";
import { dashboard } from "@/lib/get-serverside-props";
import { useUser } from "@/contexts/supabase-context";

export default function DashView({ ...rest }) {
  return <Box>Welcome To the dashboard</Box>;
}

export const getServerSideProps = dashboard();
