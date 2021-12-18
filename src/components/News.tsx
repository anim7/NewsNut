import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Props {
  apiKey: string | undefined;
  mode: "light" | "dark";
  pageSize: number;
  country: string;
  category: string;
  title: string;
}

const News: React.FC<Props> = ({
  apiKey,
  mode,
  pageSize,
  country,
  category,
  title,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  interface Element {
    url: string;
    title: string;
    description: string;
    urlToImage: string;
    author: string;
    source: {
      name: string;
    };
    publishedAt: string;
  }
  const updateNews = async () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
      )
      .then((res: AxiosResponse) => {
        console.log(res);
        setArticles(res.data.articles);
        setTotalResults(res.data.totalResults);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
    // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setArticles(parsedData.articles);
    // setTotalResults(parsedData.totalResults);
    // setLoading(false);
  };
  const fetchMoreData = async () => {
    setLoading(true);
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
          page + 1
        }&pageSize=${pageSize}`
      )
      .then((res: AxiosResponse) => {
        setPage(page + 1);
        setArticles(articles.concat(res.data.articles));
        setTotalResults(res.data.totalResults);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
    // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${
    //   page + 1
    // }&pageSize=${pageSize}`;
    // setLoading(true);
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setPage(page + 1);
    // setArticles(articles.concat(parsedData.articles));
    // setTotalResults(parsedData.totalResults);
    // setLoading(false);
  };
  useEffect(() => {
    document.title = `NewsNut - ${
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    }`;
    updateNews();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <h1
        className={`text-center my-3 text-${
          mode === "light" ? "dark" : "light"
        }`}
        style={{ margin: "30px 0px" }}
      >
        {`NewsNut - Top ${
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
        } Headlines`}
      </h1>
      <h1
        className={`text-center my-3 text-${
          mode === "light" ? "dark" : "light"
        }`}
        style={{ margin: "30px 0px" }}
      >
        {title}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div
          className={`container my-3 text-${
            mode === "light" ? "dark" : "light"
          }`}
        >
          <div className="row">
            {articles.map((element: Element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "data:image/png;base64,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"
                    }
                    newsUrl={element.url}
                    mode={mode}
                    author={element.author}
                    source={element.source.name}
                    time={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
