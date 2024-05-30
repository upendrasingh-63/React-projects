import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'

export class News extends Component {
  // static defaultProps = {
  //   country: "in",
  //   pageSize: 8,
  //   category: "general",
  // };
  // static propTypes = {
  //   country: this.PropTypes.string,
  //   pageSize: this.PropTypes.number,
  //   category: this.PropTypes.string,
  // };

  constructor(props) {
    super(props);
    // console.log("hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-SnapNews`;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updatenews() {
    const api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f9f83aed9c04c0aa3713c6e19b0d490&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(api);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updatenews();
  }

  handlepreclick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updatenews();
  };

  fetchMoreData = async () => {
  
    this.setState({ page: this.state.page + 1 });
    const api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f9f83aed9c04c0aa3713c6e19b0d490&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(api);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  
  handlenextclick = async () => {
    // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    //     }
    this.setState({
      page: this.state.page + 1,
    });
    this.updatenews();
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ marginBottom: "20px",marginTop:"60px" }}>
          SnapNews- Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
     
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
            style={{ overflow: "hidden"}}
          >
            
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 85)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                 
                );
              })}
            </div>
            
          </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
