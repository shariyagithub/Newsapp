import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'


//It is a class based component

export class News extends Component {
static defaultProps = {
  country: 'in',
 pageSize: 8,
 category:'general',
} 
static propsTypes ={
  country : PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props){
  super(props);
  console.log("hello i am constructor");
  this.state ={
   articles :[],
   loading: false,
   page:1,
   
}
  
  document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
}



async componentDidMount(){
  console.log("cmd");
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0867207824524cad9332a2fb6018253c&page=1&pageSize=${this.props.pageSize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults})
}

handlePreviousclick = async ()=>{
console.log("prev");
let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0867207824524cad9332a2fb6018253c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  

   this.setState({
  page:this.state.page - 1,
  articles: parsedData.articles
})
}

handleNextclick = async ()=>{
console.log("next");
if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

}
else{


let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0867207824524cad9332a2fb6018253c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  

   this.setState({
  page: this.state.page + 1,
  articles: parsedData.articles
})
}
}
  render() {
    return (
      <div className="container my-3">
    <h1 className="text-center" style={{margin: '35px 0px' ,marginTop:'90px'}} >Newsmonkey-Top  {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
    
    <div className="row">
    {this.state.articles?.map((element)=>{
     return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
    })}
    
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next  &rarr;</button>
        </div>
      
      </div>
    )
  }
}

export default News
