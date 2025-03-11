
import './App.css';
import "./styles/bootstrap_styles.css"

import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';

function App() {

  return (
    <>
    <div className='wrapper'>
      <div className='content'>
      <Header />

      <section className="py-4 w-100">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <MovieList />
          </div>
        </div>
      </section>
      </div>
      <div className='footer-wrapper'>
        <Footer />
      </div>
    </div>
    </>
  );
}

export default App;
