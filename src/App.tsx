import './App.css';
import { Form1 } from './components/Form1.tsx';
import { Form2 } from './components/Form2.tsx';
import { Form3 } from './components/Form3.tsx';
import { Form4 } from './components/Form4.tsx';

function App() {
  return (
    <>
      <Form4 />
      <hr style={{ color: 'white' }} />
      <Form1 />
      <Form2 />
      <Form3 />
    </>
  );
}

export default App;
