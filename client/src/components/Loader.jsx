import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Ensure the parent div has a height set
      }}
    >
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '50px',
          height: '50px',
        }}
      ></Spinner>
    </div>
  );
};

export default Loader;