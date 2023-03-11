import logo from './logo.svg';
import './App.css';
import MovingDot from './MovingDot';
import Form from './Form';
import NestedObjectForm from './nested_object_form';
import Canvas from './Canvas';

function App() {
  return (
    <div className="App">
      <Canvas></Canvas>
     {/* <MovingDot ></MovingDot> */}
     <Form></Form>
     <NestedObjectForm></NestedObjectForm>
    </div>
  );
}

export default App;
