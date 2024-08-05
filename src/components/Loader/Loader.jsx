import './Loader.css';
import { RotateLoader } from 'react-spinners';

function Loader() {
  return (
    <>
      {/* <div className='loader-text'>Loading Movies...</div> */}
      <div className='loader'>
        <RotateLoader color='#000' loading={true} size={25} />
      </div>
      {/* <h2>Please Wait</h2> */}

    </>
  );
}

export default Loader;
