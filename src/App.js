import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      foto: '',
    };
    this.fetchFunc = this.fetchFunc.bind(this);
  }

  componentDidMount() {
    this.fetchFunc();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.foto.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem('URL', this.state.foto);
    const dogBreed = this.state.foto.split('/')[4];
    alert(dogBreed);
  }

  async fetchFunc() {
    let dog = await fetch('https://dog.ceo/api/breeds/image/random');
    dog = await dog.json();
    const { message } = dog;
    this.setState({
      foto: message,
    });
  }

  render() {
    const { foto } = this.state;
    const imagem = <img className="dogImg" src={ foto } alt="Foto fofa" />;
    const showLoading = 'Loading...';
    return (
      <section>
        <h1>Cachorro fofo. menos o Terrier (por algum motivo que nao sei)</h1>
        <button type="button" onClick={ this.fetchFunc }>Mais um cachorrin</button>
        <div>
          { foto === '' ? showLoading : imagem }
        </div>

      </section>
    );
  }
}

export default App;
