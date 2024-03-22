const Error = ({ errorName }) => {
  return (
    <p>
      Whoops, something went wrong! Please try reloading this page! Message:
      {errorName}
    </p>
  );
};

export default Error;
