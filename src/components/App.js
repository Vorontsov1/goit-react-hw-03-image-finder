import   {Component}  from "react";
import Modal from "./Modal/Modal";
import axios from 'axios';
import Button from './Button/Button';
// import SearchBar from './Searchbar';


const KEY = '31783345-18b5ac2b353c5eba4d5cdf805';
const BASE_URL = 'https://pixabay.com/api';


 export default  class App extends Component  {
  state = {
    showModal: false,
    image: {},
    searchName: '',
    pageN: 1,
    isLoading: false,
    collection: [],
   };

   handleSubmit = e => {
    e.preventDefault();
    const searchName = e.target.searchName.value;
    this.setState(pS => {
      if (pS.searchName !== searchName) {
        return {
          collection: [],
          searchName: searchName,
          pageN: 1,
        };
      } else {
        return {
          pageN: pS.pagNe + 1,
        };
      }
    });
  };
  loadMore = () => {
    this.setState(({pageN}) => ({
      pageN: pageN +1,
    }));
  };

  getImages = () =>
  axios.get (`
  ${BASE_URL}=${this.state.searchName}&page=${this.state.pageN}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  )
  .then(response => 
    this.setState(({collection}) => ({
      collection: [...collection, ...response.data.hits],
      isLoading: false,
    })),
    );
    

    openImage = ({target}) => {
      this.setState({
        image: {
          searchName: this.state.searchName,
          src: target.dataset.src,
        },
      });
    };

    toggleModal = () => {
      this.setState(({showModal}) => ({
        showModal: !showModal,
      }));
    };


componentDidUpdate(pP, pS) {
  const {searchName, pageN, isLoading, image} = this.state;

  if (pS.searchName !== searchName || pS.pageN !== pageN) {
    this.setState({
      isLoading: true,
    });
    this.getImages();
  }
  if (pS.isLoading === true && !isLoading) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  if (pS.image !== image) {
    this.toggleModal();
  }
}

render () {
  const {showModal, image} = this.state;
return(
  <div className="App">
     <Button onClick={this.handleLoadMore} />
    {showModal && <Modal onClose={this.loadMore} image={image}/>}
  </div>
    );
   }
  }
