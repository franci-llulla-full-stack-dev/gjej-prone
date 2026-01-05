const ErrorText = ({ field, errors }) => {
    const err = errors?.[field];
    if (!err) return null;
    // errors sometimes come as array
    const text = Array.isArray(err) ? err.join(' ') : err;
    return <p className="text-red-500 text-sm mt-1">{text}</p>;
};

export default ErrorText;
