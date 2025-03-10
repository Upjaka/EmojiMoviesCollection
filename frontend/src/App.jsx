
import './App.css';
import "./styles/bootstrap_styles.css"

import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';

function App() {

  return (
    <>
      <Header />

      <section className="py-4 w-100">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <MovieList />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
