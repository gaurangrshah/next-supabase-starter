import { profile } from "@/lib/get-serverside-props";
import { ShowJson } from "@/chakra/components/show-json";

export default function UserPage({ user }) {
  console.log("🚀 ~ file: [...username].js ~ line 5 ~ UserPage ~ user", user);
  return <ShowJson data={user} />;
}

export const getServerSideProps = profile();
