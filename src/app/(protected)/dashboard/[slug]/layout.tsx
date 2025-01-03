import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = ({ children, params }: Props) => {
  //Query client React query
  //wip : Query client  fetch data
  return (
    <div className="p-3">
      {/* sidebar */}
      <Sidesidebar ui complete and navbar startbar slug={params.slug} />
      {/* navbar */}
      <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
        <Navbar slug={params.slug} />
      </div>
    </div>
  );
};

export default Layout;
