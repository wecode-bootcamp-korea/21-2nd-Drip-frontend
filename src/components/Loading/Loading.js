import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = () => {
  return <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />;
};

export default Loading;
