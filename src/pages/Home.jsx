import React from "react";
import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-blod text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const { loading, setLoading } = useState(false);
  const { allPost, setAllPost } = useState(null);
  const [searchText, setSearchText] = useState("");
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrablod text-[#22328] text-[32px]">
          The Comunity ShowCase
        </h1>
        <p className="mt-2 text-[66e75] text-[16px] max-w[500px]">
          Browse through a collection of imaginative and visitually available
          stunning image generators by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="fornt-medium text-[223822] text-xl mb-3">
                Showing search for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="gird lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="No Search Results Found" />
              ) : (
                <RenderCards data={[]} title="No Posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
