import { useAppContext } from "../context/appContext";
import { IArticle } from "../types/news";

const Article = ({ article }: { article: IArticle }) => {
  const { bookmarks, setBookmarks } = useAppContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const handleBookmark = (title: string) => {
    const bookmarks = localStorage.getItem("bookmarks");
    let bookmarksList: string[] = [];
    if (bookmarks) {
      bookmarksList = JSON.parse(bookmarks);
    }

    if (bookmarksList.find((bm) => bm === title)) {
      bookmarksList = bookmarksList.filter((bm) => bm !== title);
    } else {
      bookmarksList.push(title);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));

    setBookmarks(bookmarksList);
  };

  return (
    <li className="bg-white rounded-xl text-sm md:text-base">
      <article className="p-4 flex flex-col md:flex-row gap-4 ">
        {article.urlToImage && (
          <div className="h-48 flex-[300px] flex-shrink-0 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover "
              src={article.urlToImage}
              alt=""
            />
          </div>
        )}
        <div className="flex justify-between gap-4 flex-grow">
          <div className="rounded-full h-4 min-w-4 bg-[#337FF4] sm:h-6 sm:min-w-6"></div>
          <div className="flex-grow flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="font-bold grid gap-2">
                <h3 className="overflow-hidden text-ellipsis line-clamp-2 ">
                  {article.title}
                </h3>
                <div className="text-sm">{article.source.name}</div>
              </div>
              <div>{formatDate(article.publishedAt)}</div>
            </div>
            <div className="italic">{article.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={article.url}
              target="_blank"
              className="block h-6 w-6 flex-[6px] flex-grow-0"
            >
              <img
                className="h-full w-full"
                src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
                alt=""
              />
            </a>
            <button
              className="block h-6 w-6 flex-[6px] flex-grow-0"
              onClick={() => handleBookmark(article.title)}
            >
              {bookmarks.find((bm) => bm === article.title) ? (
                <img
                  className="h-full w-full"
                  src="https://cdn-icons-png.flaticon.com/512/786/786352.png"
                  alt=""
                />
              ) : (
                <img
                  className="h-full w-full"
                  src="https://cdn-icons-png.flaticon.com/512/494/494568.png"
                  alt=""
                />
              )}
            </button>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Article;
