import ArticleList from "./ArticleList";
import { INews } from "../types/news";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const Bookmarks = ({ news }: { news: INews }) => {
  const { bookmarks } = useAppContext();

  const [data, setData] = useState<INews>(null!);

  useEffect(() => {
    const bookArticles = news?.articles.filter((element) =>
      bookmarks.includes(element.title)
    );
    setData({ ...news, articles: bookArticles });
  }, [bookmarks]);

  return (
    <>
      {data?.articles.length > 0 ? (
        <ArticleList data={data} />
      ) : (
        <div className="p-4 text-center">
          <p>У вас поки що немає закладок</p>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
