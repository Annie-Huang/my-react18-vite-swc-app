import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicTabs from './components/Tabs';
import reactIcon from './assets/react.svg';

function App() {
  return (
    <div className='app'>
      <img src={reactIcon} alt='' />
      <Stack spacing={2} direction='row'>
        <Button variant='text'>Text</Button>
        <Button variant='contained'>Contained</Button>
        <Button variant='outlined'>Outlined</Button>
      </Stack>
      <BasicTabs />
    </div>
  );
}

export default App;
