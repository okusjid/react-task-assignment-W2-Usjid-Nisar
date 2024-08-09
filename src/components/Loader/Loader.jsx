import './Loader.css';
import { RotateLoader } from 'react-spinners';

function Loader() {
  return (
    <>
      <div className='loader'>
        <RotateLoader color='#000' loading={true} size={25} />
      </div>
    </>
  );
}

export default Loader;
