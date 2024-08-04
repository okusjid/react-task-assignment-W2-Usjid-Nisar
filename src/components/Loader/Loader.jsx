import './Loader.css';
import { RotateLoader } from 'react-spinners';

function Loader() {
  return (
    <div className='loader'>
      <div className='loader-text'>Loading Movies...</div>
      <RotateLoader color='#000' loading={true} size={25} />
    </div>
  );
}

export default Loader;
