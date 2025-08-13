import './views/App.css';
import HolaMundo from './components/HolaMundo';
import TarjetaPresentacion from './components/Tarjeta';
import Contador from './components/Contador';
import ListaTareas from './components/ListaTareas';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="App">
      <HolaMundo/>
      <TarjetaPresentacion 
        nombre="Luis"
        apellido="Andrada"
        profesion="Chef"
        imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3kr6U2mtXnpEeI1azMN6vw-Ppoi3FfoU8tg&s"
      />
      <Contador/>
      <ListaTareas/>
      <Formulario/>
    </div>
  );
}

export default App;
