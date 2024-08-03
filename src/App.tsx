import { useEffect, useState } from "react";
import { INews } from "./types/news";
import ArticleList from "./components/ArticleList";
import Search from "./components/Search";
import Bookmarks from "./components/Bookmarks";
import { useAppContext } from "./context/appContext";
import { defaultNews } from "./values";

function App() {
  const [news, setNews] = useState<INews>(null!);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [type, setType] = useState<"NEWS" | "BOOKMARKS">("NEWS");

  const { setBookmarks } = useAppContext();

  useEffect(() => {
    // const getNews = async () => {
    //   try {
    //     const data = await fetch(
    //       `https://newsapi.org/v2/top-headlines?q=${search}&country=ua&apiKey=${
    //         import.meta.env.VITE_API_KEY
    //       }`
    //     );
    //     const newsData = await data.json();
    //     setNews(newsData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   setIsLoading(false);
    // };
    // getNews();

    setNews(defaultNews);
    setIsLoading(false);

    const bookmarksString = localStorage.getItem("bookmarks");
    if (bookmarksString) {
      setBookmarks(JSON.parse(bookmarksString));
    }
  }, [search]);
  return (
    <div className="bg-[#D2D3D5] min-h-screen">
      <header className="sticky top-0 left-0 bg-[#DFDFDF]">
        <div className="m-auto max-w-[900px] px-4">
          <div className="p-4 border-b-2 border-gray-300">
            <Search setSearch={setSearch} />
          </div>

          <div className="grid grid-cols-2 py-4 px-4">
            <button
              className={`p-4 border border-white ${
                type === "NEWS" && "bg-white"
              }`}
              onClick={() => {
                setType("NEWS");
              }}
            >
              All News
            </button>
            <button
              className={`p-4 border border-white ${
                type === "BOOKMARKS" && "bg-white"
              }`}
              onClick={() => {
                setType("BOOKMARKS");
              }}
            >
              Bookmarks
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="m-auto max-w-[900px] px-4">
          {!isLoading && news.status === "ok" && type === "NEWS" && (
            <ArticleList data={news} />
          )}

          {!isLoading && news.status === "ok" && type === "BOOKMARKS" && (
            <Bookmarks news={news} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
