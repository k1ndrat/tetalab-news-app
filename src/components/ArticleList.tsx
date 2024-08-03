import { INews } from "../types/news";
import Article from "./Article";

const ArticleList = ({ data }: { data: INews }) => {
  return (
    <ul className="flex flex-col gap-4 py-8">
      {data?.articles.map((article) => (
        <Article article={article} key={article.publishedAt} />
      ))}
    </ul>
  );
};

export default ArticleList;
