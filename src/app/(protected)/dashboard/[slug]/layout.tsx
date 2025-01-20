import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import {
  preFetchUserAutomations,
  preFetchUserProfile,
} from "@/react-query/prefetch";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: Props) => {
  //Query Client fetch data
  const resolvedParams = await params; // Resolve params

  const query = new QueryClient();

  console.log("layout params", params);

  await preFetchUserProfile(query);

  await preFetchUserAutomations(query);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3">
        {/* sidebar */}
        <Sidebar slug={resolvedParams?.slug} />
        {/* navbar */}
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          <Navbar slug={resolvedParams?.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
