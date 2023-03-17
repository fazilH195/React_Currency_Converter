const INITIAL_VALUE = 1.1;
const generateRate = () => INITIAL_VALUE + (Math.random() * 0.1) - 0.05;
export default generateRate;
