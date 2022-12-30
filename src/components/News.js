import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([])

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    // props.setProgress(30)
    let parsedData = await data.json();
    // console.log(parsedData);
    // props.setProgress(70)

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
  document.title = `NewsBuddy - ${capitalizeFirstLetter(props.category)} Headlines`;

    updateNews()
  }, [])
  

  const fetchMoreData = async () => {
   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
    // console.log("Render");

    return (
      <>
        <div className="container my-3">
          <h2 className="text-center" style={{marginTop: "70px"}}>
            NewsBuddy - Top {capitalizeFirstLetter(props.category)}{" "}
            Headlines
          </h2>
          {loading && <Spinner />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !==totalResults}
            loader={<Spinner />}
          >
            <div className="row container">
              {articles.map((element) => {
                //   console.log(element);
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                      title={
                        element.title ? element.title.slice(0, 72) + "..." : ""
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ``
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
